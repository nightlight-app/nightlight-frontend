import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EmergencyOverlayStyles from '@nightlight/components/emergency/EmergencyOverlay.styles';
import { EmergencyOverlayProps } from '@nightlight/src/types';
import SliderArrowSvg from '@nightlight/components/svgs/SliderArrowSvg';

const NUM_SLIDER_ARROWS = 5;

const EmergencyOverlay = ({ countdown }: EmergencyOverlayProps) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View style={EmergencyOverlayStyles.container}>
        <View style={EmergencyOverlayStyles.textContainer}>
          <Text style={EmergencyOverlayStyles.text}>Slide up and hold for</Text>
          <Text style={EmergencyOverlayStyles.countdown}>
            {countdown} second{countdown === 1 ? '' : 's'}
          </Text>
          <Text style={EmergencyOverlayStyles.text}>to notify your</Text>
          <Text style={EmergencyOverlayStyles.emergencyContactsText}>
            EMERGENCY CONTACTS
          </Text>
        </View>
        <View style={EmergencyOverlayStyles.sliderContainer}>
          {[...Array(NUM_SLIDER_ARROWS)].map((_, i) => (
            <SliderArrowSvg key={i} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default EmergencyOverlay;
