import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  logOutButton: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 10,
    width: '80%',
    maxWidth: 350,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutButtonText: {
    fontFamily: Fonts.COMFORTAA_REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    padding: 15,
  },
});
