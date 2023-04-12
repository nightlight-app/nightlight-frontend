import { MAPBOX_API_KEY } from '@env';
import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MapboxGL, { Camera, CameraStop } from '@rnmapbox/maps';
import { UserTrackingMode } from '@rnmapbox/maps/javascript/components/Camera';
import { Position } from '@turf/helpers/dist/js/lib/geojson';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import { COLORS } from '@nightlight/src/global.styles';
import NightlightMapStyles from '@nightlight/components/map/NightlightMap.styles';
import {
  Markers,
  NightlightMapProps,
  UserMarkerMap,
} from '@nightlight/src/types';
import { socket } from '@nightlight/src/service/socketService';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';

// initial camera settings
const initialCamera: CameraStop = {
  animationDuration: 500,
  animationMode: 'flyTo',
  zoomLevel: 16,
  pitch: 0,
  heading: 0,
};

// pass the api key to Mapbox
MapboxGL.setAccessToken(MAPBOX_API_KEY);

const NightlightMap = ({ onError }: NightlightMapProps) => {
  const { userDocument } = useAuthContext();
  const groupId = userDocument?.currentGroup;

  /**
   * Location Tracking Variables
   */
  const [userMarkers, setUserMarkers] = useState<UserMarkerMap>({}); // map of user id to UserMarker (excluding the current user)
  const camera = useRef<Camera>(null); // reference to MapboxGL's camera
  const [userLocation, setUserLocation] = useState<MapboxGL.Location>(); // user's current location
  const [isCameraFollowingUserLocation, setIsCameraFollowingUserLocation] =
    useState<boolean>(true); // whether the camera is following user's location
  const [isCameraFollowingUserHeading, setIsCameraFollowingUserHeading] =
    useState<boolean>(false); // whether the camera is following user's heading

  // set up socket on first mount
  useEffect(() => {
    // if user is not in a group, do not set up socket
    if (!groupId) return;

    console.log(
      `[Map] Setting up socket for user ${userDocument?.firstName} ${userDocument?.lastName}...`
    );

    // tell server to add this user to a socket group
    socket.emit('joinGroup', groupId);

    // receive location broadcast from server
    socket.on('broadcastLocation', socketData => {
      // ignore if userDocument is not yet loaded
      if (!userDocument) return;

      // ignore current users' location because it is already being tracked
      if (socketData.userId === userDocument?._id) return;

      // if the user is already in userMarkers, update their location right away
      if (userMarkers[socketData.userId]) {
        const newObj: Markers = {
          imgUrl: userMarkers[socketData.userId].imgUrl,
          location: socketData.location,
        };
        setUserMarkers(prev => ({ ...prev, [socketData.userId]: newObj }));
      } else {
        // if the user is not in userMarkers, fetch their profile picture url first
        // then add them to the list
        // TODO: this is a bit inefficient as we only need imgUrlProfileLarge.
        // could we have a specific endpoint for this?
        customFetch({
          resourceUrl: `/users?userId=${socketData.userId}`,
          options: {
            method: 'GET',
          },
        })
          .then(friendData => {
            const newObj: Markers = {
              location: socketData.location,
              imgUrl: friendData.users[0].imgUrlProfileLarge,
            };
            setUserMarkers(prev => ({ ...prev, [socketData.userId]: newObj }));
          })
          .catch(e => {
            if (onError) onError();
            console.log(e);
          });
      }
    });

    // clean up by disconnecting with socket
    return () => {
      // leave the group so the server stops sending location updates to this user
      socket.emit('leaveGroup', groupId);
      socket.off(''); // disconnect from the socket
    };
  }, [groupId, userDocument]);

  // set the initial camera to user's location on first load
  useEffect(() => {
    if (userLocation && isCameraFollowingUserLocation) {
      const { longitude, latitude } = userLocation.coords;
      const position: Position = [longitude, latitude];

      camera.current?.setCamera({
        ...initialCamera,
        centerCoordinate: position,
      });
    }
  }, []);

  // FIXME: this is not working
  // useEffect(() => {
  //   // if camera changes to not follow user heading, face north
  //   if (!isCameraFollowingUserHeading) {
  //     console.log('should face north');
  //     camera.current?.setCamera({
  //       ...initialCamera,
  //       // heading: 0,
  //       // animationDuration: 500,
  //       // animationMode: 'easeTo',
  //     });
  //   }
  // }, [isCameraFollowingUserHeading]);

  //
  const handleLocationButtonPress = () => {
    if (isCameraFollowingUserLocation) {
      // if camera is already following user, toggle following user heading
      setIsCameraFollowingUserHeading(prev => !prev);
    } else {
      // if camera is not following user, start following user
      setIsCameraFollowingUserLocation(true);
    }
  };

  /**
   * Handle the onUserTrackingModeChange event emitted by Mapbox Camera.
   *
   * When userTrackingMode is string, the camera is currently tracking
   * the user. This function should do nothing.
   *
   * When userTrackingMode is null, the camera no longer tracks the
   * user. This function should set isCameraFollowingUser to false.
   */
  const handleUserTrackingModeChange = (event: {
    nativeEvent: { payload: { followUserMode: string | null } };
  }) => {
    const { followUserMode } = event.nativeEvent.payload;

    if (isCameraFollowingUserLocation && followUserMode === null) {
      setIsCameraFollowingUserLocation(false);
      setIsCameraFollowingUserHeading(false);
    }
  };

  /**
   * Update the user's location and emit it to the socket server.
   * @param loc the user's current location
   */
  const updateLocation = (loc: MapboxGL.Location) => {
    setUserLocation(loc);

    // send current user location to server
    socket.volatile.emit('locationUpdate', {
      // TODO: send the mongoDB group id which the user is in
      groupId,
      userId: userDocument?._id,
      location: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      },
    });
  };

  const locationButtonAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${isCameraFollowingUserHeading ? -45 : 0}deg`),
      },
      {
        translateY: withTiming(isCameraFollowingUserHeading ? 3 : 0),
      },
      {
        translateX: withTiming(isCameraFollowingUserHeading ? -3 : 0),
      },
    ],
  }));

  return (
    <View style={NightlightMapStyles.page}>
      <View style={NightlightMapStyles.container}>
        <MapboxGL.MapView
          style={NightlightMapStyles.map}
          styleURL={MapboxGL.StyleURL.Dark}
          zoomEnabled={true}
          scaleBarEnabled={false}
          scrollEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          compassEnabled={true}>
          {/* Camera */}
          <Camera
            ref={camera}
            onUserTrackingModeChange={handleUserTrackingModeChange}
            followUserLocation={isCameraFollowingUserLocation}
            followHeading={isCameraFollowingUserHeading ? undefined : 0} // FIXME: this is solution to facing north when not following user heading
            followUserMode={
              isCameraFollowingUserLocation
                ? isCameraFollowingUserHeading
                  ? UserTrackingMode.FollowWithHeading
                  : UserTrackingMode.Follow
                : undefined
            }
          />

          {/* UserLocation tracker */}
          <MapboxGL.UserLocation
            showsUserHeadingIndicator={true}
            renderMode={'native'}
            visible={true}
            minDisplacement={1}
            onUpdate={loc => updateLocation(loc)}
          />

          {/* Other User Markers */}
          {userMarkers &&
            Object.entries(userMarkers).map(([userId, userObj]) => {
              return (
                <MapboxGL.MarkerView
                  key={userId}
                  coordinate={[
                    userObj.location.longitude,
                    userObj.location.latitude,
                  ]}>
                  <View style={NightlightMapStyles.userMarkerView}>
                    <FontAwesome5
                      name='map-marker'
                      size={50}
                      // TODO: use the status of the user as color
                      color={COLORS.GREEN}
                    />
                    <Image
                      source={{
                        // TODO: get the image source of the received user id
                        uri: userObj.imgUrl,
                      }}
                      style={NightlightMapStyles.userMarkerImage}
                    />
                  </View>
                </MapboxGL.MarkerView>
              );
            })}
        </MapboxGL.MapView>
      </View>

      {/* Map Control Buttons */}
      <View style={MapScreenStyles.mapControlContainer}>
        {/* Change Orientation Button */}
        {/* <Pressable
          onPress={resetCameraHeadingToNorth}
          style={MapScreenStyles.mapControlButton}>
          <MaterialCommunityIcons
            name='compass'
            size={32}
            color={COLORS.WHITE}
          />
        </Pressable> */}

        {/* User Attach Button */}
        <Pressable
          onPress={handleLocationButtonPress}
          style={MapScreenStyles.mapControlButton}>
          <Animated.View style={locationButtonAnimation}>
            <MaterialCommunityIcons
              name={`navigation-variant${
                isCameraFollowingUserLocation ? '' : '-outline'
              }`}
              size={32}
              color={COLORS.NIGHTLIGHT_BLUE}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

export default NightlightMap;
