import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ToggleButtonStyles from '@nightlight/components/settings/ToggleButton.styles';
import { ToggleButtonProps } from '@nightlight/src/types';
import {
  TOGGLE_BUTTON_DIAMETER,
  TOGGLE_BUTTON_ANIMATION_DURATION,
} from '@nightlight/src/constants';

const ToggleButton = ({
  // the current value of the toggle
  value,
  // a callback function called when the user toggles the value
  toggleValue,
}: ToggleButtonProps) => {
  const sliderAnimation = useAnimatedStyle(() => ({
    width: value
      ? withTiming(TOGGLE_BUTTON_DIAMETER * 2, {
          duration: TOGGLE_BUTTON_ANIMATION_DURATION,
        })
      : withTiming(TOGGLE_BUTTON_DIAMETER, {
          duration: TOGGLE_BUTTON_ANIMATION_DURATION,
        }),
  }));

  const buttonAnimation = useAnimatedStyle(() => ({
    marginLeft: value
      ? withTiming(TOGGLE_BUTTON_DIAMETER * 2 - TOGGLE_BUTTON_DIAMETER, {
          duration: TOGGLE_BUTTON_ANIMATION_DURATION,
        })
      : withTiming(0, { duration: TOGGLE_BUTTON_ANIMATION_DURATION }),
  }));

  return (
    <Pressable onPress={toggleValue} style={ToggleButtonStyles.container}>
      <Animated.View style={[ToggleButtonStyles.slider, sliderAnimation]} />
      <Animated.View style={[ToggleButtonStyles.button, buttonAnimation]} />
    </Pressable>
  );
};

export default ToggleButton;
