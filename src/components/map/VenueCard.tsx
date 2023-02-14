import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import {
  VenueCardProps,
  Venue,
  ReactionEmoji,
  Location,
} from '@nightlight/src/types';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

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
          borderRadius: 10,
          backgroundColor: didReact ? COLORS.NIGHTLIGHT_BLUE : COLORS.DARK_GRAY,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
          flexDirection: 'row',
          shadowColor: COLORS.NIGHTLIGHT_BLUE,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: didReact ? 1 : 0,
          shadowRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}
        onPress={() => handleToggleReaction(emoji)}>
        <Text
          style={{
            fontSize: 12,
            marginRight: 3,
          }}>
          {emoji}
        </Text>
        <Text
          style={{
            color: COLORS.WHITE,
            fontFamily: Fonts.COMFORTAA_BOLD,
            fontSize: 12,
          }}>
          {count}
        </Text>
      </Pressable>
    );
  };

  return (
    <MapCard onClose={onClose} borderColor={COLORS.NIGHTLIGHT_BLUE}>
      <Text
        style={{
          color: COLORS.WHITE,
          fontSize: 20,
          fontFamily: Fonts.COMFORTAA_BOLD,
          maxWidth: '90%',
          marginBottom: 5,
        }}>
        {venue.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: 12,
              fontFamily: Fonts.COMFORTAA_REGULAR,
              marginBottom: 4,
            }}>
            {venue.address}
          </Text>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: 12,
              fontFamily: Fonts.COMFORTAA_REGULAR,
              marginBottom: 10,
            }}>
            0.3 miles
          </Text>
          <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
            {Object.keys(venue.reactions).map((emoji, index) =>
              renderReactButton(emoji as ReactionEmoji, index)
            )}
          </View>
        </View>
        <Pressable
          onPress={() => handleStartNavigation(venue.location)}
          style={{
            backgroundColor: COLORS.GREEN,
            borderColor: COLORS.DARK_GREEN,
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: 20,
              fontFamily: Fonts.COMFORTAA_BOLD,
              textAlign: 'center',
            }}>
            GO
          </Text>
        </Pressable>
      </View>
    </MapCard>
  );
};

export default VenueCard;
