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
    <Pressable style={emergencyButtonStyles.base} onPress={handlePress}>
      <View style={emergencyButtonStyles.whiteRing} />
      <View style={emergencyButtonStyles.blueDot} />
      <MaskedView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}
        maskElement={
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#000000',
            }}
          />
        }>
        <View style={emergencyButtonStyles.whiteNotch} />
      </MaskedView>
      <View style={emergencyButtonStyles.outline} />
    </Pressable>
  );
};

export default EmergencyButton;
