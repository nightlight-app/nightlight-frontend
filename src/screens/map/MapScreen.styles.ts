import { NAVBAR_HEIGHT, SAFE_AREA_BOTTOM_MARGIN } from '@nightlight/src/constants';
import { COLORS } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  mapControlContainer: {
    position: 'absolute',
    width: 50,
    height: 110,
    bottom: NAVBAR_HEIGHT + SAFE_AREA_BOTTOM_MARGIN,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  mapControlButton: {
    position: 'relative',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  currentLocationButton: {
    paddingLeft: 6,
    paddingTop: 6,
  },
  orientMapButton: {
    paddingLeft: 8,
    paddingTop: 5,
  },
});
