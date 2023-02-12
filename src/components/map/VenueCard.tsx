import React from 'react';
import { Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import { VenueCardProps } from '@nightlight/src/types';

const VenueCard = ({ venue, onClose }: VenueCardProps) => {
  return (
    <MapCard onClose={onClose} borderColor='#4A86E8'>
      {Object.entries(venue).map(([field, value], index) => {
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{field}: </Text>
            <Text style={{ color: '#00ffff' }}>{JSON.stringify(value)}</Text>
          </View>
        );
      })}
    </MapCard>
  );
};

export default VenueCard;
