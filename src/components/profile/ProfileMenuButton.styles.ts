import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  topItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    color: COLORS.WHITE,
    flex: 1,
  },
});
