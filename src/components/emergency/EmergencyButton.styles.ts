import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';

// TODO: Move this to app config
export const MOODS_ARC_DIAMETER = 140;

export default StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    width: 80,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 40,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
  },
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginBottom: 30, // adjust this
  },
  mood: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY,
    opacity: 0.8,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -20, // helps specify origin of the arc
    left: MOODS_ARC_DIAMETER / 2 - 20, // helps specify origin of the arc
  },
  moodEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
});
