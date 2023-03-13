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
    marginVertical: 5,
  },
  biggerFontSize: {
    fontSize: 32,
  },
  inputLabel: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    marginBottom: 10,
  },
  emojiLabel: {
    fontSize: 36,
    marginBottom: 10,
  },
  textInput: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    borderColor: COLORS.DARK_GRAY,
    borderBottomWidth: 2,
    marginVertical: 5,
  },
  phoneInputLabel: {
    textAlign: 'center',
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  dotStyle: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  activeDotStyle: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    width: 20,
  },
  createAccountButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderColor: COLORS.DARK_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    width: 275,
    marginVertical: 30,
  },
  createAccountButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
});
