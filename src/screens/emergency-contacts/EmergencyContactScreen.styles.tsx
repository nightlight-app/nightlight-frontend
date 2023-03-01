import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  safeview: {
    // marginBottom: 114,
    // width: '100%',
    // maxWidth: 650,
    // height: height,
    // paddingBottom: 80 + 34 + 20 + 15, // TODO: replace with constant values
    backgroundColor: 'pink',
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
    height: 30,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    display: 'flex',
    padding: 15,
    marginTop: 15,
  },
  searchText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginLeft: 10,
  },
  contactList: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  addButton: {
    alignSelf: 'center',
    margin: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  addText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    color: COLORS.WHITE,
    alignSelf: 'center',
  },
});
