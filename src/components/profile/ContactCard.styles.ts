import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
  },
  contactTopItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contactBottomItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  phone: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
  },
});
