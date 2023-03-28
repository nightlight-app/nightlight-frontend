import { Text, TouchableOpacity, View } from 'react-native';
import ButtonStyles from '@nightlight/src/components/Button.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { ButtonProps } from '@nightlight/src/types';

const Button = ({ onPress, icon, text, textColor, style, testID }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[ButtonStyles.buttonContainer, style]}
      testID={testID}>
      {icon && (
        <View
          style={{
            marginRight: text ? 10 : 0,
          }}>
          {icon}
        </View>
      )}
      {text && (
        <Text
          style={{ ...ButtonStyles.text, color: textColor || COLORS.WHITE }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
