import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    padding: 15,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    maxWidth: 350,
    width: '90%',
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    borderColor: '#e3e3e3',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: COLORS.WHITE,
    maxWidth: 350,
    alignItems: 'center',
  },
  passwordInput: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    padding: 15,
    paddingRight: 50,
    width: '100%',
  },
  viewPasswordButton: {
    marginRight: 10,
    position: 'absolute',
    right: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '90%',
    maxWidth: 350,
    marginHorizontal: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  forgotPassword: {
    color: COLORS.GRAY,
    textDecorationLine: 'underline',
  },
  logoDot: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 25,
    margin: 10,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowRadius: 10,
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  h1: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.WHITE,
    fontSize: 40,
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 5,
  },
  blueText: {
    color: COLORS.NIGHTLIGHT_BLUE,
  },
  h2: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.GRAY,
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 20,
    paddingBottom: 10,
  },
  logoBody: {
    height: 50,
    width: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: COLORS.WHITE,
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 10,
    width: '90%',
    maxWidth: 350,
    marginHorizontal: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    padding: 15,
  },
  continueWithText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: COLORS.GRAY,
    padding: 5,
  },
  googleSignInButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    width: '90%',
    maxWidth: 350,
    marginHorizontal: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googleSignInButtonText: {
    color: COLORS.GRAY,
    padding: 15,
    fontSize: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '400',
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  notMemberText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    color: COLORS.WHITE,
  },
  notMemberLink: {
    color: COLORS.NIGHTLIGHT_BLUE,
    textDecorationLine: 'underline',
  },
});
