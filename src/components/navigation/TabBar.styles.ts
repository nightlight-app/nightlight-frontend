import { StyleSheet } from 'react-native';

import {
  NIGHTLIGHT_BLUE,
  NIGHTLIGHT_GRAY,
  NIGHTLIGHT_BLACK,
  NIGHTLIGHT_WHITE,
} from '@nightlight/src/global.styles';

export default StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  navbar: {
    height: 80,
    width: 390,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundSvgContainer: {
    position: 'absolute',
    bottom: 0,
  },
  routesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
  },
  routeButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButtonContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    shadowColor: NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dangerZoneFill: {
    position: 'absolute',
    bottom: -34,
    height: 34,
    width: '100%',
    backgroundColor: NIGHTLIGHT_GRAY,
    borderColor: NIGHTLIGHT_BLACK,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
});
