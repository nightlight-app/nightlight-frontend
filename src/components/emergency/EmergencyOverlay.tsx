import React from 'react';
import { View, Text } from 'react-native';
import EmergencyOverlayStyles from '@nightlight/components/emergency/EmergencyOverlay.styles';
import { EmergencyOverlayProps } from '@nightlight/src/types';

const EmergencyOverlay = ({ countdown }: EmergencyOverlayProps) => {
  return (
    <View style={EmergencyOverlayStyles.container}>
      <View style={EmergencyOverlayStyles.textContainer}>
        <Text style={EmergencyOverlayStyles.text}>Slide up and hold for</Text>
        <Text style={EmergencyOverlayStyles.countdown}>
          {countdown} second{countdown === 1 ? '' : 's'}{' '}
        </Text>
        <Text style={EmergencyOverlayStyles.text}>to notify your</Text>
        <Text style={EmergencyOverlayStyles.emergencyContactsText}>
          EMERGENCY CONTACTS
        </Text>
      </View>
      <View style={EmergencyOverlayStyles.sliderContainer}></View>
    </View>
  );
};

export default EmergencyOverlay;
