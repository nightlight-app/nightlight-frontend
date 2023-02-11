import { StyleSheet } from 'react-native';

import {
  NIGHTLIGHT_BLUE,
  NIGHTLIGHT_GRAY,
  NIGHTLIGHT_BLACK,
  NIGHTLIGHT_WHITE,
} from '@nightlight/src/global.styles';

export default StyleSheet.create({
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: NIGHTLIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteRing: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: NIGHTLIGHT_WHITE,
    borderWidth: 3,
  },
  blueDot: {
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: NIGHTLIGHT_BLUE,
    shadowColor: NIGHTLIGHT_BLUE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  whiteNotch: {
    position: 'absolute',
    backgroundColor: NIGHTLIGHT_WHITE,
    width: 15,
    height: 35,
    borderRadius: 7.5,
    top: -10,
  },
  outline: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: NIGHTLIGHT_BLACK,
  },
});
