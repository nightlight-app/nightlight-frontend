import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    width: '85%',
    maxWidth: 340,
  },
  greetingEndContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingEndInput: { flex: 1 },
  greetingEnd: {
    marginLeft: 5,
  },
  greetingLabel: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 32,
  },
  greetingTextInput: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 32,
    borderColor: COLORS.DARK_GRAY,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
  inputLabel: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
  },
  emojiLabel: {
    fontSize: 36,
  },
  textInput: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    borderColor: COLORS.DARK_GRAY,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
  phoneInput: { flexDirection: 'row', alignItems: 'center' },
  phoneInputPrefix: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    marginRight: 10,
  },
  signInMessageContainer: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  signInPretext: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
  },
  signInLink: {},
  signInText: {
    color: COLORS.NIGHTLIGHT_BLUE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
