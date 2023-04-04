import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ToggleButtonStyles from '@nightlight/src/components/profile/ToggleButton.styles';
import { ToggleButtonProps } from '@nightlight/src/types';

const ToggleButton = ({ value, toggleValue }: ToggleButtonProps) => {
  const sliderAnimation = useAnimatedStyle(() => ({
    width: value ? withTiming(50) : withTiming(25),
  }));

  const buttonAnimation = useAnimatedStyle(() => ({
    marginLeft: value ? withTiming(50 - 25) : withTiming(0),
  }));

  return (
    <Pressable onPress={toggleValue} style={ToggleButtonStyles.container}>
      <Animated.View style={[ToggleButtonStyles.slider, sliderAnimation]} />
      <Animated.View style={[ToggleButtonStyles.button, buttonAnimation]} />
    </Pressable>
  );
};

export default ToggleButton;
