import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    height: 2,
    borderRadius: 1,
  },
  rotateCW: {
    transform: [{ rotate: '45deg' }],
  },
  rotateCCW: {
    transform: [{ rotate: '-45deg' }],
  },
});
