import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    marginVertical: 5,
    flexDirection: 'row',
    padding: 4,
    borderRadius: 10,
  },
  optionContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderColor: 'pink',
    borderWidth: 1,
  },
  optionLabel: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
