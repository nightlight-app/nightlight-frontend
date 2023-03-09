import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // TODO: Refactor hard coded values
  logo: {
    height: 43,
    width: 193,
    marginBottom: 25,
  },
  inputsContainer: {
    width: 340,
  },
  inputsTitle: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    marginBottom: 5,
  },
  emailInput: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.DARK_GRAY,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    padding: 10,
  },
  passwordInput: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.DARK_GRAY,
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    padding: 10,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderColor: COLORS.DARK_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    width: 275,
    marginVertical: 20,
  },
  signInButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
  signInOptionDividerContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInOptionDividerLine: {
    height: 1,
    flex: 1,
    borderRadius: 1,
    backgroundColor: COLORS.DARK_GRAY,
  },
  signInOptionText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    marginHorizontal: 15,
  },
  signInWithGoogleButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingVertical: 15,
    width: 275,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    height: 20,
    width: 20,
  },
  signInWithGoogleButtonText: {
    color: COLORS.DARK_GRAY,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 16,
    textAlign: 'center',
  },
  registerMessageContainer: {
    flexDirection: 'row',
  },
  registerPretext: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
  },
  registerLink: {},
  registerText: {
    color: COLORS.NIGHTLIGHT_BLUE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
