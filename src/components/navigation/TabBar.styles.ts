import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import {
  NAVBAR_HEIGHT,
  NAVBAR_WIDTH,
  SAFE_AREA_BOTTOM_MARGIN,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  navbar: {
    height: NAVBAR_HEIGHT,
    width: NAVBAR_WIDTH,
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
    bottom: NAVBAR_HEIGHT / 2,
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 2,
  },
  dangerZoneFill: {
    position: 'absolute',
    bottom: -SAFE_AREA_BOTTOM_MARGIN,
    height: SAFE_AREA_BOTTOM_MARGIN,
    width: '100%',
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
});
