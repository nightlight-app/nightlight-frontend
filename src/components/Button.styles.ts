import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderColor: COLORS.DARK_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    width: 275,
  },
  text: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    textAlign: 'center',
  },
});
