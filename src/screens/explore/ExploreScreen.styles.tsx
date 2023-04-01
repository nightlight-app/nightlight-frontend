import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 24,
    color: COLORS.WHITE,
    marginVertical: 10,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  filterText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  filterTextActive: {
    color: COLORS.WHITE,
  },
  venueList: {
    flexGrow: 1,
  },
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
  reactButtonContainer: {
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
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
  venueCardSeparator: {
    height: 5,
  },
  buttonActive: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOpacity: 1,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
});
