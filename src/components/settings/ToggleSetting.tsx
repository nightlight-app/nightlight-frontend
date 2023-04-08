import { View, Text } from 'react-native';
import ToggleButton from '@nightlight/src/components/settings/ToggleButton';
import ToggleSettingStyles from '@nightlight/src/components/settings/ToggleSetting.styles';
import { ToggleSettingProps } from '@nightlight/src/types';

const ToggleSetting = ({
  label,
  description,
  dangerous,
  value,
  toggleValue,
}: ToggleSettingProps) => {
  return (
    <View style={ToggleSettingStyles.toggleSettingContainer}>
      <View style={ToggleSettingStyles.toggleSettingDetails}>
        <Text
          style={[
            ToggleSettingStyles.toggleSettingLabel,
            dangerous && ToggleSettingStyles.dangerLabel,
          ]}>
          {label}
        </Text>
        {description && (
          <Text style={ToggleSettingStyles.toggleSettingDescription}>
            {description}
          </Text>
        )}
      </View>
      <ToggleButton value={value} toggleValue={toggleValue} />
    </View>
  );
};

export default ToggleSetting;
