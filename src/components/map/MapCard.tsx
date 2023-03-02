import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapCardBottomSvg from '@nightlight/components/svgs/MapCardBottomSvg';
import MapCardStyles from '@nightlight/components/map/MapCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { MapCardProps } from '@nightlight/src/types';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const MapCard = ({
  children,
  borderColor = '',
  shadowColor,
  buttonLeftBackgroundColor = '',
  buttonLeftBorderColor = '',
  ButtonLeftIconComponent = null,
  buttonLeftText = '',
  buttonLeftOnPress = () => {},
  buttonRightBackgroundColor = '',
  buttonRightBorderColor = '',
  ButtonRightIconComponent = null,
  buttonRightText = '',
  buttonRightOnPress = () => {},
  onClose,
}: MapCardProps) => {
  const hasButtons = buttonLeftText || buttonRightText;

  return (
    <Animated.View
      style={{
        ...MapCardStyles.container,
        shadowOpacity: shadowColor ? 1 : 0,
        shadowColor,
      }}
      entering={SlideInDown.springify().damping(25).stiffness(300)}
      exiting={SlideOutDown.mass(0.1)}>
      <View
        style={{
          ...MapCardStyles.contentContainer,
          borderColor,
          paddingBottom: hasButtons ? 30 : 15,
        }}>
        {children}
        {hasButtons && (
          <View style={MapCardStyles.actionButtonsContainer}>
            {/* Left Pressable */}
            <TouchableOpacity
              onPress={buttonLeftOnPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonLeftBackgroundColor,
                borderColor: buttonLeftBorderColor,
                borderWidth: !buttonLeftBorderColor ? 0 : 2,
              }}
              activeOpacity={0.75}>
              {ButtonLeftIconComponent && (
                <View style={MapCardStyles.buttonIconContainer}>
                  {ButtonLeftIconComponent}
                </View>
              )}
              <Text style={MapCardStyles.buttonText}>{buttonLeftText}</Text>
            </TouchableOpacity>

            {/* Right Pressable */}
            <TouchableOpacity
              onPress={buttonRightOnPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonRightBackgroundColor,
                borderColor: buttonRightBorderColor,
                borderWidth: !buttonRightBorderColor ? 0 : 2,
              }}
              activeOpacity={0.75}>
              {ButtonRightIconComponent && (
                <View style={MapCardStyles.buttonIconContainer}>
                  {ButtonRightIconComponent}
                </View>
              )}
              <Text style={MapCardStyles.buttonText}>{buttonRightText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <MapCardBottomSvg borderColor={borderColor} />
      <CloseButton style={MapCardStyles.closeButton} onPress={onClose} />
    </Animated.View>
  );
};

export default MapCard;
