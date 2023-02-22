import { StyleSheet } from 'react-native';
import { Fonts } from '@nightlight/src/global.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  safeview: {
    marginBottom: 114,
  },
  title: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontStyle: 'normal',
    fontSize: 24,
    color: COLORS.WHITE,
    alignSelf: 'center',
    padding: 10,
  },
  trending: {
    display: 'flex',
    width: '98%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
    marginTop: 3,
    paddingTop: 7,
    paddingBottom: 7,
  },
  seeMore: {
    width: '95%',
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.GRAY,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '97%',
    alignItems: 'center',
    marginTop: 7,
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    height: 25,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontSize: 14,
    color: COLORS.GRAY,
    marginLeft: 10,
  },
  trendbox: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 5,
  },
  trendingText: {
    color: COLORS.ORANGE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontSize: 16,
  },
  reactionBox: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    padding: 2,
  },
  allText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    margin: 3,
  },
});

export default styles;
