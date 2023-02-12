import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteRing: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: COLORS.WHITE,
    borderWidth: 3,
  },
  blueDot: {
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  whiteNotch: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
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
    backgroundColor: '#000000',
  },
});
