import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 65,
  },
  containerPrioritized: {
    borderRadius: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  containerBlueBorder: {
    borderColor: COLORS.NIGHTLIGHT_BLUE,
    borderWidth: 2,
  },
  containerGreenBorder: {
    borderColor: COLORS.GREEN,
    borderWidth: 2,
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderImageContainer: {},
  senderImage: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    marginRight: 10,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  senderInitials: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 18,
    color: COLORS.WHITE,
  },
  messageContainer: {
    flex: 1,
    paddingRight: 10,
  },
  senderName: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    color: COLORS.WHITE,
  },
  message: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
  },
  timestampContainer: {
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.GRAY,
    textAlign: 'right',
  },
  containerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 5,
  },
  buttonRed: {
    backgroundColor: COLORS.RED,
  },
  buttonGreen: {
    backgroundColor: COLORS.GREEN,
  },
  buttonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
