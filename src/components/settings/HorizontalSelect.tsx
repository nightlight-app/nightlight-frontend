import { Pressable, Text, View } from 'react-native';
import HorizontalSelectStyles from '@nightlight/components/settings/HorizontalSelect.styles';
import { SelectProps } from '@nightlight/src/types';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const HorizontalSelect = ({
  // the available options to select from { label: string, value: any }
  options,
  // the currently value selected
  value,
  // a callback function called when the user selects a new value (accepted as arg)
  onChangeValue,
}: SelectProps) => {
  const optionWidthPct = 100 / options.length;
  const valueIndex = options.findIndex(option => option.value === value);

  const selectIndicatorAnimation = useAnimatedStyle(() => ({
    width: optionWidthPct + '%',
    left: withTiming(optionWidthPct * valueIndex + '%'),
  }));

  return (
    <View style={HorizontalSelectStyles.container}>
      <Animated.View
        style={[
          HorizontalSelectStyles.selectIndicator,
          selectIndicatorAnimation,
        ]}
      />
      {options.map((option, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => onChangeValue(option.value)}
            style={HorizontalSelectStyles.optionContainer}>
            <Text style={HorizontalSelectStyles.optionLabel}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HorizontalSelect;
