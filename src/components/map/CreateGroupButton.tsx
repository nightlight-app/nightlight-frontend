import React from 'react';
import { TouchableHighlight, SafeAreaView, Text } from 'react-native';
import { CreateGroupButtonProps } from '@nightlight/src/types';
import CreateGroupButtonStyles from '@nightlight/components/map/CreateGroupButton.styles';
import { COLORS } from '@nightlight/src/global.styles';

const CreateGroupButton = ({ onPress }: CreateGroupButtonProps) => {
  return (
    <SafeAreaView style={{ position: 'absolute' }}>
      <TouchableHighlight
        onPress={onPress}
        style={CreateGroupButtonStyles.button}
        underlayColor={COLORS.NIGHTLIGHT_GRAY}
        activeOpacity={0.5}>
        <Text style={CreateGroupButtonStyles.buttonText}>+ Create Group</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CreateGroupButton;
