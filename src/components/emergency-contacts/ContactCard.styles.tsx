import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container1: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    paddingTop: '2%',
    justifyContent: 'space-between',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    backgroundColor: COLORS.DARKEST_GRAY,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
  },
  phone: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  blackCard: {
    backgroundColor: COLORS.BLACK,
  },
  rightView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '20%',
  },
});
