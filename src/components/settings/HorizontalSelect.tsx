import { Pressable, Text, View } from 'react-native';
import HorizontalSelectStyles from '@nightlight/components/settings/HorizontalSelect.styles';
import { SelectProps } from '@nightlight/src/types';

const HorizontalSelect = ({ options, value, onChangeValue }: SelectProps) => {
  const optionWidth: number = 100 / options.length;
  const valueIndex = options.findIndex(option => option.value === value);

  return (
    <View style={HorizontalSelectStyles.container}>
      <View
        style={{
          ...HorizontalSelectStyles.selectIndicator,
          width: optionWidth + '%',
          left: optionWidth * valueIndex + '%',
        }}
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
