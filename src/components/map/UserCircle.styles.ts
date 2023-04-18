import { StyleSheet } from 'react-native';
import { USER_CIRCLE_DIAMETER } from '@nightlight/src/constants';
import { COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
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
