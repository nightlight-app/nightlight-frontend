import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  GROUP_MEMBER_CIRCLE_DIAMETER,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  title: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedUsersText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    marginBottom: 10,
    fontSize: 14,
  },
  selectedUsersList: {
    paddingVertical: 10,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 82,
  },
  selectedUserContainer: {
    marginHorizontal: 10,
  },
  selectedUserImg: {
    height: GROUP_MEMBER_CIRCLE_DIAMETER,
    width: GROUP_MEMBER_CIRCLE_DIAMETER,
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderRadius: GROUP_MEMBER_CIRCLE_DIAMETER / 2,
  },
  selectedUserName: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
  },
  removeUserButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.RED,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.BLACK,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    marginBottom: 10,
    padding: 10,
  },
  availableUsersList: {
    height: DEVICE_HEIGHT * 0.35,
  },
  availableUsersListSeparator: {
    height: 2,
  },
  availableUserTopItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  availableUserBottomItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  availableUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
  },
  availableUserImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  availableUserName: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  selectCheckboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectCheckboxOutline: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: COLORS.NIGHTLIGHT_GRAY,
    borderWidth: 2,
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
  createButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.DARK_GREEN,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginTop: 20,
  },
  createButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 18,
  },
});
