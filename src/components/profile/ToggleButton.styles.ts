import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    height: 25,
    width: 50,
    position: 'relative',
    borderRadius: 25 / 2,
    paddingRight: 25 / 2,
  },
  slider: {
    position: 'absolute',
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 25 / 2,
    height: '100%',
  },
  button: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
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
