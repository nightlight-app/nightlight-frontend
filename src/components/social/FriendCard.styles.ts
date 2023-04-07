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
    backgroundColor: '#1E1E1E',
  },
  profileImage: {
    width: DEVICE_HEIGHT * 0.05,
    height: DEVICE_HEIGHT * 0.05,
    borderRadius: (DEVICE_HEIGHT * 0.15) / 2,
    borderWidth: 2,
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
    fontSize: 20,
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
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
