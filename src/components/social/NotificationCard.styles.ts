import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT } from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    paddingBottom: 10,
    width: '95%',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
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
    width: DEVICE_HEIGHT * 0.05,
    height: DEVICE_HEIGHT * 0.05,
    borderRadius: (DEVICE_HEIGHT * 0.15) / 2,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    margin: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
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
    paddingRight: '3%',
  },
  buttonRow: {
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
    borderColor: COLORS.DARK_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
  },
  decline: {
    backgroundColor: COLORS.RED,
    padding: 3,
    borderRadius: 5,
    borderColor: COLORS.DARK_RED,
    flexDirection: 'row',
    alignItems: 'center',
  },
  declineButtonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: COLORS.DARK_RED,
  },
  acceptButtonText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
    color: COLORS.DARK_GREEN,
  },
});
