import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
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
