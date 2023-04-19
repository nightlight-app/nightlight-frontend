import { MAPBOX_API_KEY } from '@env';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, View, Pressable, Image, AppStateStatus } from 'react-native';
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
import { NightlightMapProps, UserMarkerMap } from '@nightlight/src/types';
import { socket } from '@nightlight/src/service/socketService';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import {
  LocationServiceEvent,
  locationServiceHandler,
} from '@nightlight/src/service/locationService';

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

const NightlightMap = ({ onUserMarkerPress, onError }: NightlightMapProps) => {
  const { userDocument } = useAuthContext();
  const groupId = userDocument?.currentGroup;

  // ======================================================
  // ----------------------- CAMERA -----------------------
  // ======================================================

  /**
   * Camera Tracking Variables
   */
  const camera = useRef<Camera>(null); // reference to MapboxGL's camera
  const [isCameraFollowingUserLocation, setIsCameraFollowingUserLocation] =
    useState<boolean>(true); // whether the camera is following user's location
  const [isCameraFollowingUserHeading, setIsCameraFollowingUserHeading] =
    useState<boolean>(false); // whether the camera is following user's heading

  /**
   * Sets the initial camera to user's location on first load
   */
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
   * Handle the location button press event emitted by Mapbox Camera.
   */
  const handleLocationButtonPress = () => {
    if (isCameraFollowingUserLocation) {
      // if camera is already following user, toggle following user heading
      setIsCameraFollowingUserHeading(prev => !prev);
    } else {
      // if camera is not following user, start following user
      setIsCameraFollowingUserLocation(true);
    }
  };

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

  // ========================================================
  // ----------------------- LOCATION -----------------------
  // ========================================================

  /**
   * Location Tracking Variables
   */
  const [userLocation, setUserLocation] = useState<MapboxGL.Location>(); // user's current location
  const [userMarkers, setUserMarkers] = useState<UserMarkerMap>({}); // map of user id to UserMarker (excluding the current user)
  const userMarkersRef = useRef<UserMarkerMap>({}); // reference to userMarkers. used for updating userMarkers in socket on
  const appState = useRef<AppStateStatus>(AppState.currentState); // reference to current app state (active, inactive, background)

  /**
   * Detects when app comes to foreground/background
   *
   * Source: https://reactnative.dev/docs/appstate
   */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // TODO: send PATCH request to /users/:userId/go-online
        console.log('App has come to the foreground!');
      }

      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        // TODO: send PATCH request to /users/:userId/go-offline
        // alongside req.body.location = { latitude, longitude }
        console.log('App has come to the background!');
      }

      // update appState
      appState.current = nextAppState;
    });

    return () => {
      // remove event listener
      subscription.remove();
    };
  }, []);

  /**
   * Update userMarkersRef on every render so socket can access the latest userMarkers
   */
  useEffect(() => {
    userMarkersRef.current = userMarkers;
  });

  /**
   * Set up socket on first mount
   */
  useEffect(() => {
    // if user is not in a group or if userDocument is not yet loaded, do not set up socket
    if (!groupId || !userDocument) return;

    console.log(
      `[NightlightMap] Setting up socket for user ${userDocument?.firstName} ${userDocument?.lastName}...`
    );

    // tell server to add this user to a socket group
    socket.emit('joinGroup', groupId);

    // receive location broadcast from server
    socket.on('broadcastLocation', broadcastEventData =>
      locationServiceHandler({
        event: LocationServiceEvent.BROADCAST_LOCATION,
        eventData: broadcastEventData,
        markers: userMarkersRef.current,
        setUserMarkers: setUserMarkers,
        userDocument: userDocument,
      })
    );

    // clean up by disconnecting with socket
    return () => {
      console.log(
        `[NightlightMap] Disconnecting from socket for user ${userDocument?.firstName} ${userDocument?.lastName}...`
      );
      // leave the group so the server stops sending location updates to this user
      socket.emit('leaveGroup', groupId);
      socket.off(''); // disconnect from the socket
    };
  }, [groupId, userDocument]);

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

  // ========================================================
  // ----------------------- ANIMATIONS ---------------------
  // ========================================================

  /**
   * Animated Styles for Location Button Toggle
   */
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
                  ]}
                  anchor={{ x: 0.5, y: 1 }}>
                  <Pressable
                    style={NightlightMapStyles.userMarkerView}
                    onPress={() => onUserMarkerPress(userId)}>
                    <FontAwesome5
                      name='map-marker'
                      size={55}
                      // TODO: use the status of the user as color
                      color={COLORS.GREEN}
                    />
                    <Image
                      source={{ uri: userObj.imgUrl }}
                      style={NightlightMapStyles.userMarkerImage}
                    />
                  </Pressable>
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
