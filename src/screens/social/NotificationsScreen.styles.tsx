import { StyleSheet } from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
} from '@nightlight/src/constants';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    height: DEVICE_HEIGHT,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  notificationCountContainer: {
    minWidth: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  notificationCount: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  notificationsList: {},
  notificationsListContent: {
    paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },
  emptyNotificationsContainer: {},
  emptyNotificationsText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 40,
  },
  notificationCardSeparator: {
    height: 2,
  },

  // screenContainer: {
  //   backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  //   minHeight: '100%',
  // },
  // title: {
  //   fontFamily: Fonts.COMFORTAA_BOLD,
  //   fontSize: 24,
  //   color: COLORS.WHITE,
  //   textAlign: 'center',
  //   marginVertical: 10,
  // },
  // contactSeparator: {
  //   height: 2,
  // },
  // emptyContactsContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // emptyAvailableUsersText: {
  //   color: COLORS.GRAY,
  //   fontFamily: Fonts.COMFORTAA_BOLD,
  //   fontSize: 14,
  //   textAlign: 'center',
  //   marginTop: 20,
  //   marginBottom: 15,
  //   marginHorizontal: 50,
  //   lineHeight: 18,
  // },
  // topRow: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   paddingLeft: '5%',
  // },
  // notifCircle: {
  //   width: 25,
  //   height: 25,
  //   borderRadius: DEVICE_WIDTH / 2,
  //   backgroundColor: COLORS.RED,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginLeft: '3%',
  // },
  // numberText: {
  //   fontFamily: Fonts.COMFORTAA_BOLD,
  //   fontSize: 14,
  //   color: COLORS.WHITE,
  // },
  // notifList: {
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   width: '100%',
  //   paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 10,
  // },
  // notifListContent: {
  //   paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // notifCardSeparator: {
  //   height: 2,
  // },
});
