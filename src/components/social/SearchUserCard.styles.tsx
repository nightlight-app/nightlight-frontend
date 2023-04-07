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
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    margin: 10,
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 18,
    color: COLORS.WHITE,
  },
  activeText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 10,
    color: COLORS.GRAY,
  },
  ellipse: {
    margin: 15,
  },
  rowview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 6,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    // marginRight: 10,
    // marginBottom: 10,
  },
  addedButton: {
    padding: 6,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  addButtonText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 13,
    color: COLORS.WHITE,
  },
});
