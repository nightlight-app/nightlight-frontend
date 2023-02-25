import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  venueReactionInactive: {
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: 10,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    marginLeft: 3,
    marginRight: 3,
  },
  venueReactionActive: {
    backgroundColor: COLORS.NIGHTLIGHT_BLUE,
    borderRadius: 10,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    marginLeft: 3,
    marginRight: 3,
    shadowColor: COLORS.NIGHTLIGHT_BLUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  venueText: {
    color: COLORS.WHITE,
    fontSize: 11,
  },
});
