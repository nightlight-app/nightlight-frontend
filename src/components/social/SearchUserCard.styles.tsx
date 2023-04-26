import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { EMERGENCY_BUTTON_RADIUS, NAVBAR_HEIGHT } from '@nightlight/src/constants';

export default StyleSheet.create({
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
  emptyUsersContainer: {
    paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyUsersText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  friendButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  grayedOutButton: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  statusText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
