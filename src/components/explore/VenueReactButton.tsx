import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ReactionEmoji, VenueReactButtonProps } from '@nightlight/src/types';
import VenueReactButtonStyles from '@nightlight/components/explore/VenueReactButton.styles';

const VenueReactButton = ({ venue, reaction }: VenueReactButtonProps) => {
  const [count, setCount] = useState(venue.reactions[reaction].count);
  const [didReact, setDidReact] = useState(venue.reactions[reaction].didReact);

  const handleToggleReaction = (reaction: ReactionEmoji) => {
    // Preemptively update the count to avoid a delay in the UI
    setCount(prev => (didReact ? prev - 1 : prev + 1));
    setDidReact(prev => !prev);

    // TODO: Asynchronously update reaction in DB
    alert(`TODO: Toggle reaction for ${reaction}!`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        VenueReactButtonStyles.reactButtonContainer,
        didReact && VenueReactButtonStyles.reactButtonActive,
      ]}
      onPress={() => handleToggleReaction(reaction as ReactionEmoji)}>
      <Text style={VenueReactButtonStyles.reactButtonEmoji}>{reaction}</Text>
      <Text style={VenueReactButtonStyles.reactButtonCount}>{count}</Text>
    </TouchableOpacity>
  );
};

export default VenueReactButton;
