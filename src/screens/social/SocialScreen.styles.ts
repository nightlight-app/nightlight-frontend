import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { Dimensions, StyleSheet } from 'react-native';

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
  view: {
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
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
  },
  notifButton: {
    marginLeft: '3%',
  },
  addFriendsButton: {
    marginRight: '3%',
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  activeGroupText: {
    alignSelf: 'flex-start',
    marginLeft: '6%',
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    color: COLORS.GREEN,
    textShadowColor: COLORS.NIGHTLIGHT_BLACK,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    paddingTop: 5,
  },
  activeBox: {
    width: '90%',
    // borderColor: COLORS.GREEN,
    borderRadius: 10,
    // borderWidth: 2,
    marginTop: 5,
    alignSelf: 'center',
    // shadowColor: COLORS.GREEN,
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 10,
    // shadowOpacity: 0.5,
  },
  glow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderColor: COLORS.GREEN,
    borderWidth: 2,
    shadowColor: COLORS.GREEN,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.75,
    borderRadius: 10,
  },
  allFriendsText: {
    marginLeft: '6%',
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
    color: COLORS.GRAY,
    textShadowColor: COLORS.NIGHTLIGHT_BLACK,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
  },
  friendBox: {
    alignSelf: 'center',
    display: 'flex',
    width: '90%',
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  greenCircle: {
    width: 20,
    height: 20, 
    borderRadius: width/2,
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
  numberText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
  }
});
