import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  EMERGENCY_BUTTON_DIAMETER,
  EMERGENCY_BUTTON_RADIUS,
  MOODS_ARC_DIAMETER,
  MOODS_ARC_RADIUS,
  MOOD_ARC_BOTTOM_MARGIN,
  MOOD_BUTTON_DIAMETER,
  MOOD_BUTTON_RADIUS,
  NAVBAR_HEIGHT,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  underlayCloseHandler: {
    position: 'absolute',
    top: -DEVICE_HEIGHT + EMERGENCY_BUTTON_RADIUS + NAVBAR_HEIGHT,
    left: -(DEVICE_WIDTH / 2) + EMERGENCY_BUTTON_RADIUS,
    height: DEVICE_HEIGHT - NAVBAR_HEIGHT,
    marginBottom: NAVBAR_HEIGHT,
    width: DEVICE_WIDTH,
    zIndex: -2,
  },
  moodsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: EMERGENCY_BUTTON_RADIUS,
    width: MOODS_ARC_DIAMETER,
    marginBottom: MOOD_ARC_BOTTOM_MARGIN,
    zIndex: -1,
  },
  mood: {
    width: MOOD_BUTTON_DIAMETER,
    height: MOOD_BUTTON_DIAMETER,
    borderRadius: MOOD_BUTTON_RADIUS,
    backgroundColor: COLORS.GRAY,
    opacity: 0.8,
    justifyContent: 'center',
    position: 'absolute',
    bottom: -MOOD_BUTTON_RADIUS, // helps specify origin of the arc
    left: MOODS_ARC_RADIUS - MOOD_BUTTON_RADIUS, // helps specify origin of the arc
  },
  moodPressable: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
});
