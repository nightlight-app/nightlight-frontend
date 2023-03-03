import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';
import {
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    minHeight: '100%',
    // TODO: might have to fix paddingBottom for devices with home buttons
    paddingBottom:
      SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.RED,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  contactList: {
    marginHorizontal: 10,
  },
  contactSeparator: {
    height: 2,
  },
  emptyContactsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContactsText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderColor: COLORS.DARK_BLUE,
    borderWidth: 2,
    // TODO: might have to fix marginBottom for devices with home buttons
    marginBottom:
      SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS,
  },
  addText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    color: COLORS.WHITE,
  },
});
