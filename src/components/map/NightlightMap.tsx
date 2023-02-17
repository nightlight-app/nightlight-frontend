import { StyleSheet, View, Dimensions } from 'react-native';
import MapboxGL, {
  Camera,
  CameraStop,
  MapView,
  MapViewProps,
} from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

// initial camera settings
const initialCamera: CameraStop = {
  // centered at Vanderbilt University
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
  const [camera, setCamera] = useState<Camera>();

  // set the initial camera
  useEffect(() => {
    if (camera) {
      camera.setCamera(initialCamera);
    }
  }, [camera]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={m => {
            if (!mapView && m) setMapView(mapView);
          }}
          {...mapviewProps}>
          {/* TODO: Add markers over */}
          <Camera
            ref={c => {
              if (!camera && c) setCamera(c);
            }}></Camera>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
