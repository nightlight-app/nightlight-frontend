import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
  },
  containerAlt: {
    backgroundColor: '#1E1E1E',
  },
  profileImage: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: (height * 0.15) / 2,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    margin: 10,
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '70%',
    marginLeft: '2%',
  },
});
