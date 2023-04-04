import { Pressable, View } from 'react-native';
import ToggleButtonStyles from '@nightlight/src/components/profile/ToggleButton.styles';

const ToggleButton = () => {
  return (
    <Pressable style={ToggleButtonStyles.container}>
        <View style={ToggleButtonStyles.slider} />
        <View style={ToggleButtonStyles.button}></View>
    </Pressable>
  );
};

export default ToggleButton;
