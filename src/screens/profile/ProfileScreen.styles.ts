import { StyleSheet } from 'react-native';
import {
  DEVICE_HEIGHT,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  scrollViewContainer: {
    minHeight: '100%',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  coverPicContainer: {
    width: '100%',
  },
  coverPic: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.2,
  },
  changeCoverButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    opacity: 0.75,
  },
  settingsButtonContainer: {
    position: 'absolute',
    right: 0,
    opacity: 0.75,
  },
  settingsButton: {
    padding: 10,
  },
  profilePic: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    alignSelf: 'center',
    position: 'absolute',
    top: DEVICE_HEIGHT * 0.2 - 150 / 2,
  },
  profileDetailsContainer: {
    paddingTop: 150 / 2 + 10,
    alignItems: 'center',
  },
  editProfileButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    opacity: 0.75,
  },
  name: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    color: COLORS.WHITE,
  },
  phoneNumber: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 2,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  profileStatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    // width: 75,  // Uncomment this to make the stats boxes the same width
  },
  profileStat: {
    textAlign: 'center',
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
  },
  profileStatDesc: {
    textAlign: 'center',
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  profileStatDivider: {
    width: 1,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 20,
  },
  favoriteBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  favoriteBarTextContainer: {
    marginLeft: 10,
  },
  favoriteBarText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 20,
    color: COLORS.WHITE,
    marginVertical: 5,
  },
  favoriteBarDesc: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.GRAY,
  },
  calendarContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 10,
  },
  monthView: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  monthText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 8,
  },
  emergencyContactsButton: {
    marginVertical: 30,
    // TODO: refactor this to work with home button
    marginBottom:
      SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },

  // TODO: refactor logout button
  logOutButton: {
    marginVertical: 15,
  },
});
