import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    alignItems: 'center',
    overflowY: 'scroll',
  },

  // background image
  backgroundImageContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.25,
    display: 'flex',
    alignItems: 'flex-end',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  settingsSVG: {
    position: 'absolute',
    top: '20%',
    right: '5%',
  },
  photoSvg: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
  },
  pencilSVG: {
    marginTop: 10,
    marginRight: 10,
  },

  // profile info
  profileInfoContainer: {
    position: 'relative',
    width: DEVICE_WIDTH,
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: DEVICE_HEIGHT * 0.15,
    height: DEVICE_HEIGHT * 0.15,
    borderRadius: (DEVICE_HEIGHT * 0.15) / 2,
    marginTop: -(DEVICE_HEIGHT * 0.15 * 0.5),
    borderWidth: 3,
    borderColor: COLORS.WHITE,
  },
  name: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 24,
    color: COLORS.WHITE,
    marginTop: 5,
  },
  number: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 2,
  },

  // profile statistics
  scrollView: {
    display: 'flex',
    width: DEVICE_WIDTH,
  },
  profileStatisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginTop: 10,
  },
  box: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  numberText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 32,
    color: COLORS.WHITE,
  },
  smallText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 15,
    color: COLORS.GRAY,
  },

  // favorite bar
  favoriteBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  partySvg: {
    marginLeft: 20,
    marginRight: 20,
  },
  barInfo: {
    display: 'flex',
    justifyContent: 'center',
  },
  barText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 20,
    color: COLORS.WHITE,
    marginBottom: 2,
  },

  // calendar views
  calendarView: {
    width: DEVICE_WIDTH,
    display: 'flex',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderRadius: 15,
    width: DEVICE_WIDTH * 0.9,
    maxWidth: 500,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 6,
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  monthView: {
    display: 'flex',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 13,
    color: COLORS.WHITE,
  },

  // emergency contacts button
  emergencyView: {
    width: DEVICE_WIDTH,
    alignItems: 'center',
    marginBottom:
      SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS,
  },
  emergencyPressable: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 8,
  },
  emergencyText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
