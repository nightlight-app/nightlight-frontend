import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import { Route } from '@nightlight/src/types';
import emergencyButtonStyles from '@nightlight/components/navigation/EmergencyButton.styles';

const EmergencyButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // TODO: Handle emergency button press
    navigation.navigate(Route.EMERGENCY as never); // silly TypeScript
  };

  return (
    <Pressable
      accessibilityLabel={Route.EMERGENCY}
      style={emergencyButtonStyles.base}
      onPress={handlePress}>
      <View style={emergencyButtonStyles.whiteRing} />
      <View style={emergencyButtonStyles.blueDot} />
      <MaskedView
        style={emergencyButtonStyles.maskedView}
        maskElement={<View style={emergencyButtonStyles.maskElement} />}>
        <View style={emergencyButtonStyles.whiteNotch} />
      </MaskedView>
      <View style={emergencyButtonStyles.outline} />
    </Pressable>
  );
};

export default EmergencyButton;
