import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '@nightlight/src/constants';

export default StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  map: {
    height: DEVICE_HEIGHT,
  },
});
