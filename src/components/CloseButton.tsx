import React from 'react';
import { Pressable, View } from 'react-native';
import CloseButtonStyles from '@nightlight/components/CloseButton.styles';
import { CloseButtonProps, TestingLabel } from '@nightlight/src/types';

const CloseButton = ({ onPress, size = 15, style }: CloseButtonProps) => {
  return (
    <Pressable
      accessibilityLabel={TestingLabel.CLOSE_BUTTON}
      style={{ ...CloseButtonStyles.container, ...style }}
      onPress={onPress}>
      <View
        style={{
          width: Math.sqrt(2 * size ** 2),
          ...CloseButtonStyles.line,
          ...CloseButtonStyles.rotateCW,
        }}
      />
      <View
        style={{
          width: Math.sqrt(2 * size ** 2),
          ...CloseButtonStyles.line,
          ...CloseButtonStyles.rotateCCW,
        }}
      />
    </Pressable>
  );
};

export default CloseButton;
