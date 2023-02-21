import { MAPBOX_API_KEY } from '@env';
import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import MapboxGL, { Camera, CameraStop, MapView } from '@rnmapbox/maps';
import { COLORS } from '@nightlight/src/global.styles';
import { Ionicons } from '@expo/vector-icons';
import { convertCoordinateToPosition } from '@nightlight/src/utils/utils';
import NightlightMapStyles from '@nightlight/components/map/NightlightMap.styles';
import { mapviewProps } from '@nightlight/src/types';

// initial camera settings
const initialCamera: CameraStop = {
  animationDuration: 0,
  zoomLevel: 16,
  pitch: 50,
  heading: 62,
};

// pass the api key to Mapbox
MapboxGL.setAccessToken(MAPBOX_API_KEY);

const NightlightMap = () => {
  // reference to MapboxGL's map view
  const [mapView, setMapView] = useState<MapView>();

  // reference to MapboxGL's camera
  const camera = useRef<Camera>(null);

  // keep track of the user's current location
  const [userLocation, setUserLocation] = useState<MapboxGL.Location>();

  // whether the camera is following user (both location and device heading)
  const [isCameraFollowingUser, setIsCameraFollowingUser] =
    useState<boolean>(true);

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

  return (
    <View style={NightlightMapStyles.page}>
      <View style={NightlightMapStyles.container}>
        <MapboxGL.MapView
          ref={m => {
            if (!mapView && m) setMapView(mapView);
          }}
          {...mapviewProps}>
          {/* Camera */}
          <Camera
            ref={camera}
            onUserTrackingModeChange={handleUserTrackingModeChange}
            followUserLocation={isCameraFollowingUser}
            followHeading={userLocation?.coords.heading}
          />

          {/* UserMarker */}
          <MapboxGL.UserLocation
            showsUserHeadingIndicator={true}
            renderMode={'native'}
            visible={true}
            minDisplacement={5}
            onUpdate={loc => setUserLocation(loc)}>
            {/* TODO: add and style the user circle marker */}
            <MapboxGL.CircleLayer id='userMarker' />
          </MapboxGL.UserLocation>
        </MapboxGL.MapView>
      </View>

      {/* Interactable Buttons */}
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
        <Ionicons name='md-navigate' size={32} color={COLORS.NIGHTLIGHT_BLUE} />
      </Pressable>
    </View>
  );
};

export default NightlightMap;
