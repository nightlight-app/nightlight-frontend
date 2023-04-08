import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { DEVICE_HEIGHT } from '@nightlight/src/constants';
import { StyleSheet } from 'react-native';

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
    backgroundColor: '#1E1E1E', // TODO: use color from global.styles
  },
  profileImage: {
    width: DEVICE_HEIGHT * 0.05,
    height: DEVICE_HEIGHT * 0.05,
    borderRadius: (DEVICE_HEIGHT * 0.15) / 2,
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
