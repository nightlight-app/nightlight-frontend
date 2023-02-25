import { Text, Pressable } from 'react-native';
import { useState } from 'react';
import { VenueReactionProps } from '@nightlight/src/types';
import VenueReactionStyles from '@nightlight/components/venue-reaction/VenueReaction.styles';

const VenueReaction = ({ emoji, value, active }: VenueReactionProps) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <Pressable
      onPress={() => setIsActive(!isActive)}
      style={
        isActive
          ? VenueReactionStyles.venueReactionActive
          : VenueReactionStyles.venueReactionInactive
      }>
      <Text style={VenueReactionStyles.venueText}>{emoji + ' ' + value}</Text>
    </Pressable>
  );
};

export default VenueReaction;
