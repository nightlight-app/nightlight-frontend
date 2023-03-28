import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';
import {
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    minHeight: '100%',
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
    marginTop: 20,
    marginBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },
});
