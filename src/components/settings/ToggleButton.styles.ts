import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import {
  TOGGLE_BUTTON_DIAMETER,
  TOGGLE_BUTTON_RADIUS,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    height: TOGGLE_BUTTON_DIAMETER,
    width: TOGGLE_BUTTON_DIAMETER * 2,
    position: 'relative',
    borderRadius: TOGGLE_BUTTON_RADIUS,
    paddingRight: TOGGLE_BUTTON_RADIUS,
  },
  slider: {
    position: 'absolute',
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: TOGGLE_BUTTON_RADIUS,
    height: '100%',
    borderColor: COLORS.NIGHTLIGHT_GRAY,
    borderWidth: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    height: TOGGLE_BUTTON_DIAMETER,
    width: TOGGLE_BUTTON_DIAMETER,
    borderRadius: TOGGLE_BUTTON_RADIUS,
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
  },
});
