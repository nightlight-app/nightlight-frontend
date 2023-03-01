import React from 'react';
import { TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { CreateGroupButtonProps } from '@nightlight/src/types';
import CreateGroupButtonStyles from '@nightlight/components/map/CreateGroupButton.styles';

const CreateGroupButton = ({ onPress }: CreateGroupButtonProps) => {
  return (
    <SafeAreaView style={{ position: 'absolute' }}>
      <TouchableOpacity
        onPress={onPress}
        style={CreateGroupButtonStyles.button}
        activeOpacity={0.75}>
        <Text style={CreateGroupButtonStyles.buttonText}>+ Create Group</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateGroupButton;
