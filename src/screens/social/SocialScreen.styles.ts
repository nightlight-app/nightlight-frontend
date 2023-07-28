import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    height: DEVICE_HEIGHT,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    padding: 10,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    marginVertical: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 18,
    color: COLORS.WHITE,
  },
  sectionHeaderCountContainer: {
    marginLeft: 5,
    borderRadius: 11,
    height: 22,
    minWidth: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
  },
  sectionHeaderCount: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  friendsList: {},
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
  },
  topItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
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
  userName: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 18,
    color: COLORS.WHITE,
  },
  itemSeparator: {
    height: 2,
  },
  emptyAvailableUsersContainer: {},
  emptyAvailableUsersText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 50,
    lineHeight: 18,
  },
  addFriendsButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderColor: COLORS.DARK_GRAY,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  addFriendsButtonText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
  },
});
