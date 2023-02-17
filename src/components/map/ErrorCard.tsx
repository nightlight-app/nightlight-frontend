import React from 'react';
import { Text } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import { ErrorCardProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import ErrorCardStyles from '@nightlight/components/map/ErrorCard.styles';

const DEFAULT_MESSAGE =
  '⚠️ Uh oh! We made an oopsie...or you just drank too much...cheers! 🍻';

const ErrorCard = ({ message = DEFAULT_MESSAGE, onClose }: ErrorCardProps) => {
  return (
    <MapCard onClose={onClose} borderColor={COLORS.RED}>
      <Text style={ErrorCardStyles.message}>{message}</Text>
    </MapCard>
  );
};

export default ErrorCard;
