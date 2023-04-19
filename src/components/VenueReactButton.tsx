import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ReactionEmoji, VenueReactButtonProps } from '@nightlight/src/types';
import VenueReactButtonStyles from '@nightlight/components/VenueReactButton.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';

const VenueReactButton = ({ venue, reaction }: VenueReactButtonProps) => {
  const { userDocument } = useAuthContext();

  const [count, setCount] = useState(venue.reactions[reaction].count);
  const [didReact, setDidReact] = useState(venue.reactions[reaction].didReact);

  const handleToggleReaction = async (reaction: ReactionEmoji) => {
    const userId = userDocument?._id;

    // Preemptively update the count to avoid a delay in the UI
    setCount(prev => (didReact ? prev - 1 : prev + 1));
    setDidReact(prev => !prev);

    // Update reaction in DB
    try {
      await customFetch({
        resourceUrl: `/venues/${venue._id}/react`,
        options: {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userDocument?._id,
            emoji: reaction,
          }),
        },
      });
    } catch (error) {
      // TODO: If DB update fails we should show the error message similar to what we have in signup/login page.
      console.error(
        `[VenueReactButton] Error toggling '${reaction}' reaction on venue ${venue._id} for user ${userId}:\n`,
        error
      );

      // Revert the UI update
      setCount(prev => (didReact ? prev + 1 : prev - 1));
      setDidReact(prev => !prev);
    }
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
