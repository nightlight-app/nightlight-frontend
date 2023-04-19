import React from 'react';
import { TouchableHighlight, SafeAreaView, Text } from 'react-native';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { ButtonProps } from '@nightlight/src/types';
import CreateGroupButtonStyles from '@nightlight/components/map/CreateGroupButton.styles';
import { COLORS } from '@nightlight/src/global.styles';

const CreateGroupButton = ({ onPress }: ButtonProps) => {
  return (
    <SafeAreaView style={CreateGroupButtonStyles.container}>
      <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
        <TouchableHighlight
          onPress={onPress}
          style={CreateGroupButtonStyles.button}
          underlayColor={COLORS.NIGHTLIGHT_GRAY}
          activeOpacity={0.5}>
          <Text style={CreateGroupButtonStyles.buttonText}>+ Create Group</Text>
        </TouchableHighlight>
      </Animated.View>
    </SafeAreaView>
  );
};

export default CreateGroupButton;
