import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import {
  VenueCardProps,
  Venue,
  ReactionEmoji,
  Location,
} from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import VenueCardStyles from '@nightlight/components/map/VenueCard.styles';

const VenueCard = ({ venue, onClose }: VenueCardProps) => {
  const [reactions, setReactions] = useState<Venue['reactions']>(
    venue.reactions
  );

  const handleStartNavigation = (destination: Location) => {
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  const handleToggleReaction = (emoji: ReactionEmoji) => {
    const reactionsCopy = { ...reactions };
    const reactionCopy = { ...reactionsCopy[emoji] };
    let updatedReaction = { ...reactionCopy };
    const { count, didReact } = updatedReaction;

    updatedReaction = {
      count: didReact ? count - 1 : count + 1,
      didReact: !didReact,
    };

    try {
      setReactions(prev => ({ ...prev, [emoji]: updatedReaction })); // Optimistically update state

      // TODO: Asynchronously update reaction in DB
      // throw new Error('Not connected to the database yet!'); // TODO: Remove this line
    } catch (error) {
      console.error(error);
      setReactions(reactionsCopy); // Revert to previous state
    }
  };

  const renderReactButton = (emoji: ReactionEmoji, key: number) => {
    const { count, didReact } = reactions[emoji];

    return (
      <Pressable
        key={key}
        style={{
          ...VenueCardStyles.reactButtonContainer,
          backgroundColor: didReact ? COLORS.NIGHTLIGHT_BLUE : COLORS.DARK_GRAY,
          shadowOpacity: didReact ? 1 : 0,
        }}
        onPress={() => handleToggleReaction(emoji)}>
        <Text style={VenueCardStyles.reactButtonEmoji}>{emoji}</Text>
        <Text style={VenueCardStyles.reactButtonCount}>{count}</Text>
      </Pressable>
    );
  };

  return (
    <MapCard onClose={onClose} borderColor={COLORS.NIGHTLIGHT_BLUE}>
      <Text style={VenueCardStyles.venueName}>{venue.name}</Text>
      <View style={VenueCardStyles.venueDetailsContainer}>
        <View>
          <Text style={VenueCardStyles.venueAddress}>{venue.address}</Text>
          <Text style={VenueCardStyles.venueDistance}>0.3 miles</Text>
          <View style={VenueCardStyles.reactButtonsContainer}>
            {Object.keys(venue.reactions).map((emoji, index) =>
              renderReactButton(emoji as ReactionEmoji, index)
            )}
          </View>
        </View>
        <Pressable
          onPress={() => handleStartNavigation(venue.location)}
          style={VenueCardStyles.navigateButton}>
          <Text style={VenueCardStyles.navigateButtonText}>GO</Text>
        </Pressable>
      </View>
    </MapCard>
  );
};

export default VenueCard;
