import { View, Text, TouchableOpacity } from 'react-native';
import { Location, ReactionEmoji } from '@nightlight/src/types';
import ExploreCardStyles from '@nightlight/components/explore/ExploreCard.styles';
import VenueReactButton from '@nightlight/components/VenueReactButton';
import { ExploreCardProps } from '@nightlight/src/types';

const ExploreCard = ({ venue }: ExploreCardProps) => {
  const handleStartNavigation = (destination: Location) => {
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  return (
    <View style={ExploreCardStyles.venueCardContainer}>
      <Text style={ExploreCardStyles.venueName}>{venue.name}</Text>
      <View style={ExploreCardStyles.venueDetailsContainer}>
        <View>
          <Text style={ExploreCardStyles.venueAddress}>{venue.address}</Text>
          <Text style={ExploreCardStyles.venueDistance}>0.3 miles</Text>
          <View style={ExploreCardStyles.reactButtonsContainer}>
            {Object.keys(venue.reactions).map((emoji, index) => (
              <VenueReactButton
                key={index}
                venue={venue}
                reaction={emoji as ReactionEmoji}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => handleStartNavigation(venue.location)}
          style={ExploreCardStyles.navigateButton}>
          <Text style={ExploreCardStyles.navigateButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ExploreCard;
