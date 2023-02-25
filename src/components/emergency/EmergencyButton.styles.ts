import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import {
  EMERGENCY_BUTTON_DIAMETER,
  EMERGENCY_BUTTON_RADIUS,
  MOODS_ARC_DIAMETER,
  MOODS_ARC_RADIUS,
  MOOD_ARC_BOTTOM_MARGIN,
  MOOD_BUTTON_DIAMETER,
  MOOD_BUTTON_RADIUS,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    width: EMERGENCY_BUTTON_DIAMETER,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: EMERGENCY_BUTTON_RADIUS,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
  },
  base: {
    width: EMERGENCY_BUTTON_DIAMETER,
    height: EMERGENCY_BUTTON_DIAMETER,
    borderRadius: EMERGENCY_BUTTON_RADIUS,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  whiteRing: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    // borderColor: COLORS.WHITE,
    borderWidth: 3,
  },
  blueDot: {
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 8.5,
    // backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    // shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  whiteNotch: {
    position: 'absolute',
    // backgroundColor: COLORS.WHITE,
    width: 15,
    height: 35,
    borderRadius: 7.5,
    top: -10,
  },
  outline: {
    position: 'absolute',
    width: EMERGENCY_BUTTON_DIAMETER,
    height: EMERGENCY_BUTTON_DIAMETER,
    borderRadius: EMERGENCY_BUTTON_RADIUS,
    borderWidth: 2,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
  },
  maskedView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  maskElement: {
    width: EMERGENCY_BUTTON_DIAMETER,
    height: EMERGENCY_BUTTON_DIAMETER,
    borderRadius: EMERGENCY_BUTTON_RADIUS,
    backgroundColor: COLORS.BLACK,
  },
  moodsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: '50%',
    width: MOODS_ARC_DIAMETER,
    marginBottom: MOOD_ARC_BOTTOM_MARGIN,
  },
  mood: {
    width: MOOD_BUTTON_DIAMETER,
    height: MOOD_BUTTON_DIAMETER,
    borderRadius: MOOD_BUTTON_RADIUS,
    backgroundColor: COLORS.GRAY,
    opacity: 0.8,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -MOOD_BUTTON_RADIUS, // helps specify origin of the arc
    left: MOODS_ARC_RADIUS - MOOD_BUTTON_RADIUS, // helps specify origin of the arc
  },
  moodPressable: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
});
