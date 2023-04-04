import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  EMERGENCY_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    height: DEVICE_HEIGHT,
  },
  contentContainer: {
    paddingHorizontal: 10,
    flex: 1,
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
    marginHorizontal: 20,
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
  filterButtonActive: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOpacity: 1,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
  filterText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  filterTextActive: {
    color: COLORS.WHITE,
  },
  venueList: {},
  venueListContent: {
    paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
  },
  venueCardSeparator: {
    height: 5,
  },
  emptyVenuesContainer: {
    paddingBottom: NAVBAR_HEIGHT + EMERGENCY_BUTTON_RADIUS + 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyVenuesText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 14,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
});
