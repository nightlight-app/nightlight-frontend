import { StyleSheet } from 'react-native';
import { Fonts } from '@nightlight/src/global.styles';
import { COLORS } from '@nightlight/src/global.styles';

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
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    color: '#FFFFFF',
    alignSelf: 'center',
    padding: 10,
  },
  trending: {
    display: 'flex',
    width: '98%',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#E07324',
    borderWidth: 1,
    marginTop: 3,
    paddingTop: 7,
    paddingBottom: 7,
  },
  seeMore: {
    width: '95%',
    backgroundColor: '#3D3D3D',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(144, 144, 144, 1)',
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
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: '#A0A0A0',
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
    color: '#E07324',
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
  },
  reactionBox: {
    backgroundColor: '#525252',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    padding: 2,
  },
  allText: {
    color: 'white',
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    margin: 3,
  },
});

export default styles;
