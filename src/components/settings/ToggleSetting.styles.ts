import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  toggleSettingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  toggleSettingDetails: {
    marginRight: 10,
    flex: 1,
  },
  toggleSettingLabel: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  dangerLabel: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    color: COLORS.RED,
  },
  toggleSettingDescription: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginTop: 3,
  },
});
