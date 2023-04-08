import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  reactButtonContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  reactButtonActive: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOpacity: 1,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
  reactButtonEmoji: {
    fontSize: 12,
    marginRight: 3,
  },
  reactButtonCount: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
  },
});
