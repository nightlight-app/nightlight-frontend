import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  safeview: {
    marginBottom: 114,
    width: '100%',
    maxWidth: 650,
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
    height: 30,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 15,
  },
  searchText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginLeft: 10,
  },
  addButton: {
    alignSelf: 'center',
    margin: 30,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 15,
    width: '35%',
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    shadowRadius: 5,
  },
  addText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});
