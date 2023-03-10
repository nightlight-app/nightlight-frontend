import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
const styles = StyleSheet.create({
  container: {
    width: '98%',
    borderColor: '#3D3D3D',
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 10,
    display: 'flex',
  },
  venueTitle: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 20,
    color: COLORS.WHITE,
    paddingLeft: 20,
    paddingTop: 20,
  },
  venueAddress: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    paddingLeft: 20,
    paddingTop: 5,
  },
  goButton: {
    padding: 10,
    backgroundColor: COLORS.GREEN,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
    width: 70,
    marginRight: 10,
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
    justifyContent: 'space-between',
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
  goButtonSubText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 10,
  },
});

export default styles;
