import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import { EMERGENCY_BUTTON_DIAMETER, SAFE_AREA_BOTTOM_MARGIN } from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: EMERGENCY_BUTTON_DIAMETER + SAFE_AREA_BOTTOM_MARGIN + 15, // navbar height + safe area bottom margin + gap
    alignSelf: 'center',
    width: 370,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
  contentContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
  cardBottom: {
    bottom: 0,
  },
});
