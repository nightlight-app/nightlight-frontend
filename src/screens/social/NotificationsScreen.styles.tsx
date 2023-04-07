import { Dimensions, StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

const { height, width } = Dimensions.get('window');
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
  contactSeparator: {
    height: 2,
  },
  emptyContactsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyAvailableUsersText: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 50,
    lineHeight: 18,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '5%',
  },
  notifCircle: {
    width: 25,
    height: 25,
    borderRadius: width / 2,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3%',
  },
  numberText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.WHITE,
  },
  notifList: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});
