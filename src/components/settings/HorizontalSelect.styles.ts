import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { HORIZONTAL_SELECT_PADDING } from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    marginVertical: 5,
    flexDirection: 'row',
    padding: HORIZONTAL_SELECT_PADDING,
    borderRadius: 10,
  },
  selectIndicator: {
    position: 'absolute',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    height: '100%',
    alignSelf: 'center',
    margin: HORIZONTAL_SELECT_PADDING,
  },
  optionContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  optionLabel: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
