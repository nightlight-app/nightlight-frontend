import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapCardBottomSvg from '@nightlight/components/svgs/MapCardBottomSvg';
import MapCardStyles from '@nightlight/components/map/MapCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { MapCardProps } from '@nightlight/src/types';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { COLORS } from '@nightlight/src/global.styles';

const MapCard = ({
  children,
  borderColor = COLORS.NIGHTLIGHT_BLACK,
  shadowColor,
  buttonLeft,
  buttonRight,
  onClose,
}: MapCardProps) => {
  const hasButtons = buttonLeft?.text || buttonRight?.text;

  return (
    <Animated.View
      style={{
        ...MapCardStyles.container,
        shadowOpacity: shadowColor ? 1 : 0,
        shadowColor,
      }}
      entering={SlideInDown.springify().damping(25).stiffness(300)}
      // FIXME: slide out animation is not working
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
              onPress={buttonLeft?.onPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonLeft?.backgroundColor,
                borderColor: buttonLeft?.borderColor,
                borderWidth: !buttonLeft?.borderColor ? 0 : 2,
              }}
              activeOpacity={0.75}>
              {buttonLeft?.iconComponent && (
                <View style={MapCardStyles.buttonIconContainer}>
                  {buttonLeft?.iconComponent}
                </View>
              )}
              <Text style={MapCardStyles.buttonText}>{buttonLeft?.text}</Text>
            </TouchableOpacity>

            {/* Right Pressable */}
            <TouchableOpacity
              onPress={buttonRight?.onPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonRight?.backgroundColor,
                borderColor: buttonRight?.borderColor,
                borderWidth: !buttonRight?.borderColor ? 0 : 2,
              }}
              activeOpacity={0.75}>
              {buttonRight?.iconComponent && (
                <View style={MapCardStyles.buttonIconContainer}>
                  {buttonRight?.iconComponent}
                </View>
              )}
              <Text style={MapCardStyles.buttonText}>{buttonRight?.text}</Text>
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
