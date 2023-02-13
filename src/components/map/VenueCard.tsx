import React from 'react';
import { Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import { VenueCardProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const VenueCard = ({ venue, onClose }: VenueCardProps) => {
  return (
    <MapCard onClose={onClose} borderColor={COLORS.NIGHTLIGHT_BLUE}>
      {Object.entries(venue).map(([field, value], index) => {
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold' }}>
              {field}:{' '}
            </Text>
            <Text style={{ color: COLORS.NIGHTLIGHT_BLUE, flex: 1 }}>
              {JSON.stringify(value)}
            </Text>
          </View>
        );
      })}
    </MapCard>
  );
};

export default VenueCard;
