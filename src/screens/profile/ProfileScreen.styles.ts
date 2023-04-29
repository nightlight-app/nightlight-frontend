import { StyleSheet } from 'react-native';
import {
  DEVICE_HEIGHT,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  scrollViewContent: {
    paddingBottom:
      SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },
  coverPicContainer: {
    width: '100%',
    // borderBottomWidth: 2,
    // borderBottomColor: COLORS.DARK_GRAY,
  },
  coverPic: {
    width: '100%',
    height: DEVICE_HEIGHT * 0.2,
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profilePic: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    marginTop: -150 / 2,
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 65,
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.WHITE,
  },
  editProfileButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editProfileText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: COLORS.WHITE,
  },
  userInfoContainer: {
    marginTop: 10,
  },
  userName: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  userDetailIcon: {
    width: 25,
  },
  userDetailText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    marginVertical: 25,
  },
  statContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statNumber: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  statText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  statDelimiter: {
    backgroundColor: COLORS.WHITE,
    width: 2,
    borderRadius: 2,
  },
  favoriteBarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
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
  favoriteBarDescription: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.GRAY,
  },
  emergencyContactsButtonContainer: {
    marginVertical: 10,
  },
  profileMenuContainer: {},
  itemSeparator: {
    height: 2,
  },
});
