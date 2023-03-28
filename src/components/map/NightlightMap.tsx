import { MAPBOX_API_KEY, SERVER_URL } from '@env';
import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import MapboxGL, { Camera, MapView, CameraStop } from '@rnmapbox/maps';
import { COLORS } from '@nightlight/src/global.styles';
import { Ionicons } from '@expo/vector-icons';
import { Position } from '@turf/helpers/dist/js/lib/geojson';
import NightlightMapStyles from '@nightlight/components/map/NightlightMap.styles';
import {
  Markers,
  NightlightMapProps,
  UserMarkerMap,
} from '@nightlight/src/types';
import { socket } from '@nightlight/src/service/socketService';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

// initial camera settings
const initialCamera: CameraStop = {
  animationDuration: 0,
  zoomLevel: 16,
  pitch: 0,
  heading: 0,
};

// pass the api key to Mapbox
MapboxGL.setAccessToken(MAPBOX_API_KEY);

const NightlightMap = ({ onError }: NightlightMapProps) => {
  const { userDocument } = useAuthContext();

  /**
   * Location Tracking Variables
   */
  const groupId = userDocument?.currentGroup;

  // the map of user id to UserMarker (excluding the current user)
  const [userMarkers, setUserMarkers] = useState<UserMarkerMap>({});

  // reference to MapboxGL's camera
  const camera = useRef<Camera>(null);

  // keep track of the user's current location
  const [userLocation, setUserLocation] = useState<MapboxGL.Location>();

  // whether the camera is following user (both location and device heading)
  const [isCameraFollowingUser, setIsCameraFollowingUser] =
    useState<boolean>(false);

  // set up socket on first mount
  useEffect(() => {
    // if user is not in a group, do not set up socket
    if (!groupId) return;
    console.log('setting up socket for user', userDocument?.firstName);

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
        fetch(`${SERVER_URL}/users?userId=${socketData.userId}`, {
          method: 'GET',
        })
          .then(res => res.json())
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
      // disconnect from the socket
      socket.off('');
    };
  }, [groupId, userDocument]);

  // set the initial camera to user's location on first load
  useEffect(() => {
    if (userLocation && isCameraFollowingUser) {
      const { longitude, latitude } = userLocation.coords;
      const position: Position = [longitude, latitude];

      camera.current?.setCamera({
        ...initialCamera,
        centerCoordinate: position,
      });
    }
  }, [camera.current]);

  /**
   * Toggle the isCameraFollowingUser variable
   */
  const toggleCameraFollow = () => setIsCameraFollowingUser(prev => !prev);

  /**
   * Reset the camera's heading to point to North
   */
  const resetCameraHeadingToNorth = () => {
    if (camera.current) {
      camera.current.setCamera({
        heading: 0,
        animationDuration: 1000,
        animationMode: 'easeTo',
      });
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
    // camera is currently following user
    if (isCameraFollowingUser) {
      if (event.nativeEvent.payload.followUserMode === null)
        // stop camera from following user
        setIsCameraFollowingUser(false);
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

  return (
    <View style={NightlightMapStyles.page}>
      <View style={NightlightMapStyles.container}>
        <MapboxGL.MapView
          zoomEnabled={true}
          scaleBarEnabled={false}
          style={NightlightMapStyles.map}
          styleURL={MapboxGL.StyleURL.Dark}
          scrollEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          compassEnabled={true}>
          {/* Camera */}
          <Camera
            ref={camera}
            onUserTrackingModeChange={handleUserTrackingModeChange}
            followUserLocation={isCameraFollowingUser}
            followHeading={userLocation?.coords.heading}
          />

          {/* UserLocation tracker */}
          <MapboxGL.UserLocation
            // showsUserHeadingIndicator={true} // TODO: uncomment after demo
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

      {/* Interactable Buttons */}
      <View style={MapScreenStyles.mapControlContainer}>
        <Pressable
          onPress={resetCameraHeadingToNorth}
          style={[
            MapScreenStyles.mapControlButton,
            MapScreenStyles.orientMapButton,
          ]}>
          <Ionicons name='md-compass' size={32} color={COLORS.WHITE} />
        </Pressable>
        <Pressable
          onPress={toggleCameraFollow}
          style={[
            MapScreenStyles.mapControlButton,
            MapScreenStyles.currentLocationButton,
          ]}>
          <MaterialCommunityIcons
            name={`navigation-variant${
              isCameraFollowingUser ? '' : '-outline'
            }`}
            size={32}
            color={COLORS.NIGHTLIGHT_BLUE}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default NightlightMap;
