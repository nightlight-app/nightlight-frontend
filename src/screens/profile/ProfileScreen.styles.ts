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
  editButtonsContainer: {
    flexDirection: 'row',
  },
  editProfileButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderColor: COLORS.WHITE,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  saveEditsButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
  },
  editProfileText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
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
  textInput: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    padding: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: COLORS.DARK_GRAY,
    borderRadius: 5,
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.WHITE,
    fontSize: 20,
    flex: 1,
  },
  datePickerButtonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.WHITE,
    fontSize: 20,
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
  favoriteVenueContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  favoriteVenueTextContainer: {
    marginLeft: 10,
  },
  favoriteVenueText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 20,
    color: COLORS.WHITE,
    marginVertical: 5,
  },
  favoriteVenueDescription: {
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
