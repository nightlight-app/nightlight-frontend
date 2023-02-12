import React from 'react';
import { Pressable, View } from 'react-native';
import closeButtonStyles from '@nightlight/components/CloseButton.styles';
import { CloseButtonProps } from '@nightlight/src/types';

const CloseButton = ({ onPress, size = 15, style }: CloseButtonProps) => {
  return (
    <Pressable
      style={{ ...closeButtonStyles.container, ...style }}
      onPress={onPress}>
      <View
        style={{
          width: Math.sqrt(2 * size ** 2),
          ...closeButtonStyles.line,
          ...closeButtonStyles.rotateCW,
        }}
      />
      <View
        style={{
          width: Math.sqrt(2 * size ** 2),
          ...closeButtonStyles.line,
          ...closeButtonStyles.rotateCCW,
        }}
      />
    </Pressable>
  );
};

export default CloseButton;
