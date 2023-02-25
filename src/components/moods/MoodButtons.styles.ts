import { StyleSheet } from 'react-native';
import { COLORS } from '@nightlight/src/global.styles';
import {
  MOODS_ARC_DIAMETER,
  MOODS_ARC_RADIUS,
  MOOD_ARC_BOTTOM_MARGIN,
  MOOD_BUTTON_DIAMETER,
  MOOD_BUTTON_RADIUS,
} from '@nightlight/src/constants';

export default StyleSheet.create({
  moodsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: '50%',
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
