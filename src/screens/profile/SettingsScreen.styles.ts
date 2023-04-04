import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    minHeight: '100%',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 10,
  },
  category: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 18,
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  categoryDescription: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.GRAY,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  settingLabel: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  settingDescription: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 12,
    color: COLORS.GRAY,
    marginTop: 3,
  },
  dangerButton: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.RED,
    alignSelf: 'center',
    marginTop: 10,
    width: '90%',
    maxWidth: 350,
  },
});
