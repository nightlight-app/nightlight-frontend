import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import MapboxGL, {
  Camera,
  CameraStop,
  MapboxGLEvent,
  MapView,
  MapViewProps,
} from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// initial camera settings
const initialCamera: CameraStop = {
  // centered at Vanderbilt University [longitude, latitude]
  centerCoordinate: [-86.78472854186322, 36.157845061262364],
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
    useState<boolean>(false);

  // set the initial camera on first load
  useEffect(() => {
    camera.current?.setCamera(initialCamera);
  }, [camera.current]);

  // reset camera to user position
  const toggleCameraFollow = () => setIsCameraFollowingUser(prev => !prev);

  // reset camera heading to north
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
    <View style={styles.page}>
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: height,
    width: width,
  },
  map: {
    height: height,
  },
});

// the map view props to pass into
const mapviewProps: MapViewProps = {
  scaleBarEnabled: false,
  style: styles.map,
  styleURL: MapboxGL.StyleURL.Dark,
  scrollEnabled: true,
  pitchEnabled: true,
  rotateEnabled: true,
  compassEnabled: true,
};

export default NightlightMap;
