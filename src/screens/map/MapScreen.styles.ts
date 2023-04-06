import {
  DEVICE_HEIGHT,
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';
import { COLORS } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
  },
  mapControlContainer: {
    position: 'absolute',
    bottom: NAVBAR_HEIGHT + SAFE_AREA_BOTTOM_MARGIN + 15, // navbar height + safe area bottom margin + gap
    right: 15,
  },
  mapControlButton: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderRadius: 10,
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
