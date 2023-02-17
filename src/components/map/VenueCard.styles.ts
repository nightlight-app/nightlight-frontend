import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  venueName: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: Fonts.COMFORTAA_BOLD,
    maxWidth: '90%',
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
  reactButtonsContainer: { flexDirection: 'row', maxWidth: '100%' },
  reactButtonContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  reactButtonEmoji: {
    fontSize: 12,
    marginRight: 3,
  },
  reactButtonCount: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 12,
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
