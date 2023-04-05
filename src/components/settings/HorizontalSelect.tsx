import { Pressable, Text, View } from 'react-native';
import HorizontalSelectStyles from '@nightlight/components/settings/HorizontalSelect.styles';
import { SelectProps } from '@nightlight/src/types';

const HorizontalSelect = ({ options, value, onChangeValue }: SelectProps) => {
  return (
    <View style={HorizontalSelectStyles.container}>
      {options.map((option, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => onChangeValue(option.value)}
            style={[
              HorizontalSelectStyles.optionContainer,
              option.value === value && { backgroundColor: 'green' },
            ]}>
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
