import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  userHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userProfilePic: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.GRAY,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfilePicText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    opacity: 0.8,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
  },
  userName: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: Fonts.COMFORTAA_BOLD,
    marginRight: 10,
    maxWidth: '70%',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastActiveText: {
    color: COLORS.GRAY,
    fontSize: 12,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    marginBottom: 4,
  },
  phoneNumber: {
    color: COLORS.GRAY,
    fontSize: 12,
    fontFamily: Fonts.COMFORTAA_REGULAR,
  },
  navigationDetailsContainer: { flexDirection: 'row', alignItems: 'center' },
  navigationDistanceText: {
    color: COLORS.GRAY,
    fontSize: 12,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    textAlign: 'center',
    marginRight: 5,
    maxWidth: 50,
  },
  navigationButton: {
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButtonText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '105%',
    alignSelf: 'center',
    bottom: -30,
  },
  callButton: {
    flex: 1,
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  callButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    marginLeft: 5,
  },
  actionButtonsDivider: { width: 100, marginHorizontal: 10 },
  pingButton: {
    flex: 1,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderColor: COLORS.DARK_BLUE,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  pingButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    marginLeft: 5,
  },
});
