import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  safeview: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    width: '100%',
    height: height,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    alignSelf: 'center',
    paddingTop: 10,
  },
  subtitle: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    alignSelf: 'center',
    padding: 5,
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    display: 'flex',
    padding: 12,
    marginVertical: 15,
  },
  searchText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginLeft: 10,
  },
  contactList: {
    height: '50%',
    marginHorizontal: 20,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: 'teal',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 15,
  },
  addText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    color: COLORS.WHITE,
  },
});
