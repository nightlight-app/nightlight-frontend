import { MAPBOX_API_KEY } from '@env';
import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import MapboxGL, { Camera, CameraStop, MapView } from '@rnmapbox/maps';
import { COLORS } from '@nightlight/src/global.styles';
import { Ionicons } from '@expo/vector-icons';
import { convertCoordinateToPosition } from '@nightlight/src/utils/utils';
import NightlightMapStyles from '@nightlight/components/map/NightlightMap.styles';
import { UserMarkers } from '@nightlight/src/types';
import { socket } from '@nightlight/src/service/SocketService';
import { RANDOM_USER, TEST_USERS } from '@nightlight/src/testData';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// initial camera settings
const initialCamera: CameraStop = {
  animationDuration: 0,
  zoomLevel: 16,
  pitch: 0, // TODO: change later?
  heading: 62,
};

// pass the api key to Mapbox
MapboxGL.setAccessToken(MAPBOX_API_KEY);

// TODO: temporarily hardcoding the user id so that different
// simulators are treated as different users
const USER_ID = RANDOM_USER._id;

const NightlightMap = () => {
  /**
   * Location Tracking Variables
   */
  // the userId should be mongoDB user id
  const userId = USER_ID;
  // the groupId should be mongoDB group id
  const groupId = 'testGroup';
  // the list of other user markers to display (excluding the current user)
  const [userMarkers, setUserMarkers] = useState<UserMarkers[]>([]);

  // reference to MapboxGL's map view
  const [mapView, setMapView] = useState<MapView>();

  // reference to MapboxGL's camera
  const camera = useRef<Camera>(null);

  // keep track of the user's current location
  const [userLocation, setUserLocation] = useState<MapboxGL.Location>();

  // whether the camera is following user (both location and device heading)
  const [isCameraFollowingUser, setIsCameraFollowingUser] =
    useState<boolean>(true);

  // set up socket on first mount
  useEffect(() => {
    // tell server to add this user to a socket group
    socket.emit('joinGroup', groupId);

    // receive location broadcast from server
    socket.on('broadcastLocation', data => {
      // ignore current users' location because it is already being tracked
      if (data.userId === userId) return;

      // update the userMarkers state for other users' locations
      setUserMarkers(prev => {
        const newMarkers = [...prev];
        const index = newMarkers.findIndex(user => user.id === data.userId);
        if (index !== -1) {
          // if the user is already in the list, update their location
          newMarkers[index] = {
            id: data.userId,
            location: data.location,
          };
        } else {
          // if the user is not in the list, add them to the list
          newMarkers.push({
            id: data.userId,
            location: data.location,
          });
        }
        return newMarkers;
      });
    });

    // clean up by disconnecting with socket
    return () => {
      // leave the group so the server stops sending location updates to this user
      socket.emit('leaveGroup', groupId);
      // disconnect from the socket
      socket.off('');
    };
  }, []);

  // set the initial camera to user's location on first load
  useEffect(() => {
    if (userLocation)
      camera.current?.setCamera({
        ...initialCamera,
        centerCoordinate: convertCoordinateToPosition(userLocation.coords),
      });
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

  const updateLocation = (loc: MapboxGL.Location) => {
    setUserLocation(loc);

    // send current user location to server
    socket.volatile.emit('locationUpdate', {
      // TODO: send the mongoDB group id which the user is in
      groupId,
      // TODO: send the mongDB user id
      userId,
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
          ref={m => {
            if (!mapView && m) setMapView(mapView);
          }}
          scaleBarEnabled={false}
          style={NightlightMapStyles.map}
          styleURL={MapboxGL.StyleURL.Dark}
          scrollEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
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
            showsUserHeadingIndicator={false}
            renderMode={'native'}
            visible={true}
            minDisplacement={1}
            onUpdate={loc => updateLocation(loc)}
          />

          {/* Other User Markers */}
          {userMarkers &&
            userMarkers.map((user, index) => {
              return (
                <MapboxGL.MarkerView
                  key={index}
                  coordinate={[user.location.longitude, user.location.latitude]}
                  title={user.id}>
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
                        uri: TEST_USERS[1].imgUrlProfileSmall,
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
          {!isCameraFollowingUser && (
            <MaterialCommunityIcons
              name='navigation-variant-outline'
              size={32}
              color={COLORS.NIGHTLIGHT_BLUE}
            />
          )}
          {isCameraFollowingUser && (
            <MaterialCommunityIcons
              name='navigation-variant'
              size={32}
              color={COLORS.NIGHTLIGHT_BLUE}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default NightlightMap;
