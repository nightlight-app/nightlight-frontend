import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';
import {
  EMERGENCY_BUTTON_DIAMETER,
  MAP_CARD_WIDTH,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: EMERGENCY_BUTTON_DIAMETER + SAFE_AREA_BOTTOM_MARGIN + 15, // navbar height + safe area bottom margin + gap
    alignSelf: 'center',
    width: MAP_CARD_WIDTH,
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '105%',
    alignSelf: 'center',
    bottom: -30,
  },
  button: {
    width: 120,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  buttonIconContainer: {
    marginRight: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
  },
});
