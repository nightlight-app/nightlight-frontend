import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapCardBottomSvg from '@nightlight/components/svgs/MapCardBottomSvg';
import MapCardStyles from '@nightlight/components/map/MapCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { MapCardProps } from '@nightlight/src/types';

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
    <View
      style={{
        ...MapCardStyles.container,
        shadowOpacity: shadowColor ? 1 : 0,
        shadowColor,
      }}>
      <View
        style={{
          ...MapCardStyles.contentContainer,
          borderColor,
          paddingBottom: hasButtons ? 30 : 15,
        }}>
        {children}
        {hasButtons && (
          <View style={MapCardStyles.actionButtonsContainer}>
            <TouchableOpacity
              onPress={buttonLeftOnPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonLeftBackgroundColor,
                borderColor: buttonLeftBorderColor,
              }}
              activeOpacity={0.75}>
              {ButtonLeftIconComponent && (
                <View style={MapCardStyles.buttonIconContainer}>
                  {ButtonLeftIconComponent}
                </View>
              )}
              <Text style={MapCardStyles.buttonText}>{buttonLeftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={buttonRightOnPress}
              style={{
                ...MapCardStyles.button,
                backgroundColor: buttonRightBackgroundColor,
                borderColor: buttonRightBorderColor,
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
    </View>
  );
};

export default MapCard;
