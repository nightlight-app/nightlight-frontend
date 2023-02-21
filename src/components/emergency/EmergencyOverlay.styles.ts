import { StyleSheet, Dimensions, ScaledSize } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

const { height, width }: ScaledSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: -height + 40 + 80 + 34,
    left: -(width / 2) + 40,
    height: height,
    width: width,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 50,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
  },
  countdown: {
    color: COLORS.RED,
    fontSize: 30,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
  emergencyContactsText: {
    color: COLORS.RED,
    fontSize: 25,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
    marginVertical: 30,
    maxWidth: 360,
  },
  sliderContainer: {
    width: 80,
    height: height / 2 - 80,
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    marginBottom: 34 + 40,
    borderRadius: 40,
  },
});
