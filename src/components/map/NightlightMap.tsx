import { StyleSheet, View, Dimensions } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '@env';

const { width, height } = Dimensions.get('window');

MapboxGL.setAccessToken(MAPBOX_API_KEY);

const NightlightMap = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} scaleBarEnabled={false} />
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

export default NightlightMap;
