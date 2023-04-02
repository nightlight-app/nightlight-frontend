import { Text, TouchableOpacity } from 'react-native';
import { ReactionEmoji, VenueReactButtonProps } from '@nightlight/src/types';
import VenueReactButtonStyles from '@nightlight/components/explore/VenueReactButton.styles';

const VenueReactButton = ({ venue, reaction }: VenueReactButtonProps) => {
  const { count, didReact } = venue.reactions[reaction];

  const handleToggleReaction = (reaction: ReactionEmoji) => {
    venue.reactions[reaction].didReact = !didReact;
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
