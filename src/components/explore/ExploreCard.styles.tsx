import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    width: '98%',
    borderColor: COLORS.DARK_GRAY,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
  },
  venueTitle: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 20,
    color: COLORS.WHITE,
    paddingLeft: 20,
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  venueAddress: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    paddingLeft: 20,
    paddingTop: 5,
  },
  reactionView: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 20,
  },
  goButton: {
    padding: 10,
    backgroundColor: COLORS.GREEN,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  goButtonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 26,
    paddingTop: 2,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lowerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reactionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  reactionGroup: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingTop: 8,
  },
  distanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 5,
  },
  centeredText: {
    textAlign: 'center',
    color: COLORS.GRAY,
  },
  goButtonSubText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 10,
  },
});
