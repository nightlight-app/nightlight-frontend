import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  bannerText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    textAlign: 'center',
  },
});
