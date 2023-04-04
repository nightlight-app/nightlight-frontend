import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  venueCardContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_BLACK,
    padding: 10,
    borderRadius: 10,
  },
  venueName: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: Fonts.COMFORTAA_BOLD,
    marginBottom: 5,
  },
  venueDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueAddress: {
    color: COLORS.GRAY,
    fontSize: 12,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    marginBottom: 4,
  },
  venueDistance: {
    color: COLORS.GRAY,
    fontSize: 12,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    marginBottom: 10,
  },
  reactButtonsContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  navigateButton: {
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.DARK_GREEN,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
  },
});
