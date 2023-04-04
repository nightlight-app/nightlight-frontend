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
  button: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    right: 0,
  },
  slider: {
    position: 'absolute',
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderTopLeftRadius: 25 / 2,
    borderBottomLeftRadius: 25 / 2,
    height: '100%',
    width: '100%',
  },
});
