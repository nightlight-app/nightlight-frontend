import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
  },
  button: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    top: 10,
    left: 10,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
  },
});
