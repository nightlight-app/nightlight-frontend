import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { CreateGroupButtonProps } from '@nightlight/src/types';
import CreateGroupButtonStyles from '@nightlight/components/map/CreateGroupButton.styles';

const CreateGroupButton = ({ onPress }: CreateGroupButtonProps) => {
  return (
    <SafeAreaView style={{ position: 'absolute' }}>
      <Pressable onPress={onPress} style={CreateGroupButtonStyles.button}>
        <Text style={CreateGroupButtonStyles.buttonText}>+ Create Group</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreateGroupButton;
