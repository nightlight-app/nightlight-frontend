import { StyleSheet } from 'react-native';
import { USER_CIRCLE_DIAMETER } from '@nightlight/src/constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  image: {
    width: USER_CIRCLE_DIAMETER,
    height: USER_CIRCLE_DIAMETER,
    borderRadius: USER_CIRCLE_DIAMETER / 2,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
  },
  initials: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.WHITE,
    fontSize: 24,
  },
  emoji: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
