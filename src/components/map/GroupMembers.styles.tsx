import { COLORS } from '@nightlight/src/global.styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    top: 10,
    left: 10,
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
  },
});
