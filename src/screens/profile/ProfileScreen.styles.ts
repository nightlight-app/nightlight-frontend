import { COLORS, Fonts } from '@nightlight/src/global.styles';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    alignItems: 'center',
    overflowY: 'scroll',
  },

  // background image
  backgroundImageContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height * 0.25,
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
    marginTop: height * 0.19,
    width: width,
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: height * 0.15,
    height: height * 0.15,
    borderRadius: (height * 0.15) / 2,
    marginTop: -(height * 0.15 * 0.5),
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
    color: '#A6A6A6',
    marginTop: 2,
  },

  // profile statistics
  scrollView: {
    display: 'flex',
    width: width,
  },
  profileStatisticsContainer: {
    position: 'relative',
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
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    borderRadius: 15,
    width: width,
    height: 100,
    marginTop: 20,
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
    position: 'relative',
    width: width,
    height: height * 0.3,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: width * 0.8,
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 20,
  },
});