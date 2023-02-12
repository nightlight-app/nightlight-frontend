import React from 'react';
import { Pressable, View } from 'react-native';
import MapCardBottomSvg from '@nightlight/assets/icons/MapCardBottomSvg';
import mapCardStyles from '@nightlight/components/map/MapCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { MapCardProps } from '@nightlight/src/types';

const MapCard = ({
  children,
  borderColor = '#141414',
  onClose,
}: MapCardProps) => {
  return (
    <View style={mapCardStyles.container}>
      <View
        style={{
          ...mapCardStyles.contentContainer,
          borderColor,
        }}>
        {children}
      </View>
      <MapCardBottomSvg
        borderColor={borderColor}
        style={mapCardStyles.cardBottom}
      />
      <CloseButton style={mapCardStyles.closeButton} onPress={onClose} />
    </View>
  );
};

export default MapCard;
