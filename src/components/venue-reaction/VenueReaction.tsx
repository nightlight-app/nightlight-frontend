import { Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Reaction, ReactionEmoji, VenueReactionProps } from '@nightlight/src/types';
import VenueReactionStyles from '@nightlight/components/venue-reaction/VenueReaction.styles';
import axios from 'axios';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

const VenueReaction = ({ emoji, value, active, id }: VenueReactionProps) => {
  const [isActive, setIsActive] = useState(active);

  const { userDocument } = useAuthContext();

  const handleToggleReaction = (emoji: { emoji: string; }) => {
    setIsActive(!isActive);

    let user = userDocument?._id;

    // add reaction to venue if active
    if (isActive) {
    axios
      .post(`http://localhost:6060/venues/${id}/reaction?userId=${user}&emoji=${emoji}`)
      .then(function (response) {
      })
      .catch((e: any) => {
        console.log('Error: ', JSON.stringify(e.message));
      });
  } // remove reaction from venue otherwise
      else {
        axios
      .delete(`http://localhost:6060/venues/${id}/reaction?userId=${user}&emoji=${emoji}`)
      .then(function (response) {
      })
      .catch((e: any) => {
        console.log('Error: ', JSON.stringify(e.message));
      });
  
      }
    }
    

  return (
    <Pressable
      onPress={() => handleToggleReaction({emoji})}
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
