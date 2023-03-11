import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
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
    marginLeft: 5,
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
  passwordInputContainer: {
    position: 'relative',
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
  errorInput: {
    borderColor: COLORS.RED,
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 0,
    margin: 8,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: COLORS.DARK_GRAY,
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
    marginVertical: 30,
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
    marginRight: 15,
  },
  signInWithGoogleButtonText: {
    color: COLORS.DARK_GRAY,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 16,
    textAlign: 'center',
  },
  signUpMessageContainer: {
    flexDirection: 'row',
  },
  signUpPretext: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
  },
  signUpLink: {},
  signUpText: {
    color: COLORS.NIGHTLIGHT_BLUE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
