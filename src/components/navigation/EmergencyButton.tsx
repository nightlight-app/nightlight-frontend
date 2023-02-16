import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import { Route } from '@nightlight/src/types';
import EmergencyButtonStyles from '@nightlight/components/navigation/EmergencyButton.styles';

const EmergencyButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // TODO: Handle emergency button press
    navigation.navigate(Route.EMERGENCY as never); // silly TypeScript
  };

  return (
    <Pressable
      accessibilityLabel={Route.EMERGENCY}
      style={EmergencyButtonStyles.base}
      onPress={handlePress}>
      <View style={EmergencyButtonStyles.whiteRing} />
      <View style={EmergencyButtonStyles.blueDot} />
      <MaskedView
        style={EmergencyButtonStyles.maskedView}
        maskElement={<View style={EmergencyButtonStyles.maskElement} />}>
        <View style={EmergencyButtonStyles.whiteNotch} />
      </MaskedView>
      <View style={EmergencyButtonStyles.outline} />
    </Pressable>
  );
};

export default EmergencyButton;
