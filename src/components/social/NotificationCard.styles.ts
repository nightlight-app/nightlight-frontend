import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    paddingBottom: 10,
    width: '95%',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5
  },
  containerGreen: {
    borderColor: COLORS.GREEN,
    borderWidth: 2,
  },
  containerBlue: {
    borderColor: COLORS.NIGHTLIGHT_BLUE,
    borderWidth: 2,
  },
  profileImage: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: (height * 0.15) / 2,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    margin: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
  },
  rowview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textbox: {
    width: '65%',
    marginLeft: '2%',
  },
  time: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 10,
    color: COLORS.GRAY,
    marginLeft: '3%',
  },
  buttonrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  accept: {
    backgroundColor: COLORS.GREEN,
    padding: 3,
    borderRadius: 5,
    borderColor: '#2E491B',
    flexDirection: 'row',
    alignItems: 'center',
  },
  decline: {
    backgroundColor: COLORS.RED,
    padding: 3,
    borderRadius: 5,
    borderColor: '#732014',
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  declineButtonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: '#732014',
  },
  acceptButtonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: '#2E491B'
  }
});
