import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { SMILE_FACE_ASPECT_RATIO } from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContentContainer: {
    width: '85%',
    maxWidth: 340,
  },
  greetingEndContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingEndInput: {
    flex: 1,
  },
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
    fontSize: 28,
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
    lineHeight: 32,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  phoneInputPrefix: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    marginRight: 10,
  },
  phoneTextInput: {
    width: 196,
  },
  signInMessageContainer: {
    position: 'relative',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  signInPretext: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
  },
  signInLink: {},
  linkText: {
    color: COLORS.NIGHTLIGHT_BLUE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  passwordInputContainer: {
    position: 'relative',
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 0,
    margin: 5,
  },
  profilePictureUploadContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.DARK_GRAY,
  },
  smileyFace: {
    width: 150,
    height: 150 / SMILE_FACE_ASPECT_RATIO,
    marginTop: 50,
    marginBottom: 46,
  },
  imageButtonsContianer: {
    flexDirection: 'row',
    width: 275,
    justifyContent: 'center',
    marginTop: 15,
  },
  chooseImageButton: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.DARK_GRAY,
    width: 200,
  },
  removeImageButton: {
    backgroundColor: COLORS.RED,
    borderWidth: 0,
    marginLeft: 10,
    padding: 0,
    flex: 1,
  },
  maybeLaterContainer: {
    marginTop: 35,
  },
  createAccountButton: {
    borderWidth: 0,
    marginVertical: 40,
  },
  navContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  navButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  navDotsContainer: {
    flexDirection: 'row',
  },
  navDot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginHorizontal: 3,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  navButton: {
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderColor: COLORS.GRAY,
  },
  nextButton: {
    marginLeft: 'auto',
  },
});
