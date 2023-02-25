import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EMERGENCY_BUTTON_DIAMETER,
  EMERGENCY_BUTTON_RADIUS,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top:
      -DEVICE_HEIGHT +
      EMERGENCY_BUTTON_RADIUS +
      EMERGENCY_BUTTON_DIAMETER +
      SAFE_AREA_BOTTOM_MARGIN,
    left: -(DEVICE_WIDTH / 2) + EMERGENCY_BUTTON_RADIUS,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 50,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
  },
  countdown: {
    color: COLORS.RED,
    fontSize: 30,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
  emergencyContactsText: {
    color: COLORS.RED,
    fontSize: 25,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
    marginVertical: 30,
    maxWidth: 360,
  },
  sliderContainer: {
    width: EMERGENCY_BUTTON_DIAMETER,
    height: DEVICE_HEIGHT / 2 - EMERGENCY_BUTTON_DIAMETER,
    backgroundColor: '#181818',
    marginBottom: SAFE_AREA_BOTTOM_MARGIN + EMERGENCY_BUTTON_RADIUS,
    borderRadius: EMERGENCY_BUTTON_RADIUS,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
  },
});
