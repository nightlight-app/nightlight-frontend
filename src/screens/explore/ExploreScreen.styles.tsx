import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';
import {
  NAVBAR_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 10,
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
  venueList: {
    marginBottom: SAFE_AREA_BOTTOM_MARGIN + NAVBAR_HEIGHT,
  },
  venueListContent: {
    flexGrow: 1,
  },
  venueCardSeparator: {
    height: 5,
  },
});
