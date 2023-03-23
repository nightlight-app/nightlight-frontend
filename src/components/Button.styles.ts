import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderColor: COLORS.NIGHTLIGHT_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    width: 275,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
});
