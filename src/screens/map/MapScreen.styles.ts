import { COLORS } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  mapControlButton: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    position: 'absolute',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2.5,
    width: 50,
    height: 50,
  },
  currentLocationButton: {
    bottom: 140,
    right: 10,
    paddingLeft: 6,
    paddingTop: 6,
  },
  orientMapButton: {
    bottom: 200,
    right: 10,
    paddingLeft: 8,
    paddingTop: 5,
  },
});
