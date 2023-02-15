import React from 'react';
import { View } from 'react-native';
import MapCardBottomSvg from '@nightlight/assets/icons/MapCardBottomSvg';
import MapCardStyles from '@nightlight/components/map/MapCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { MapCardProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const MapCard = ({
  children,
  borderColor = COLORS.NIGHTLIGHT_BLACK,
  onClose,
}: MapCardProps) => {
  return (
    <View style={MapCardStyles.container}>
      <View
        style={{
          ...MapCardStyles.contentContainer,
          borderColor,
        }}>
        {children}
      </View>
      <MapCardBottomSvg
        borderColor={borderColor}
        style={MapCardStyles.cardBottom}
      />
      <CloseButton style={MapCardStyles.closeButton} onPress={onClose} />
    </View>
  );
};

export default MapCard;
