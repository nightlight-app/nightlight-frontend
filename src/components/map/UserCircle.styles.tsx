import { USER_CIRCLE_DIAMETER } from '@nightlight/src/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: USER_CIRCLE_DIAMETER,
    height: USER_CIRCLE_DIAMETER,
    borderRadius: USER_CIRCLE_DIAMETER / 2,
    borderWidth: 3,
  },
  emoji: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
