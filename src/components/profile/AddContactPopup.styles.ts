import { StyleSheet } from 'react-native';
import { Fonts, COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  popupBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '20%',
    width: '90%',
    alignSelf: 'center',
    marginTop: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    position: 'absolute',
    borderRadius: 10,
  },
  contactTitle: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    width: '80%',
    marginVertical: '2%',
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 4,
    shadowRadius: 4,
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    borderColor: COLORS.GRAY,
    borderWidth: 2,
  },
  addButton: {
    backgroundColor: COLORS.GREEN,
    padding: 10,
    marginVertical: '2%',
    borderRadius: 10,
  },
  addText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 14,
    color: COLORS.WHITE,
  },
  titleRow: {
    flexDirection: 'row',
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  feather: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
