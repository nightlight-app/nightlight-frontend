import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    minHeight: '100%',
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 10,
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
});
