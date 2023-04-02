import { View, Text, TouchableOpacity } from 'react-native';
import { Location, ReactionEmoji, Venue } from '@nightlight/src/types';
import VenueCardStyles from '@nightlight/components/explore/VenueCard.styles';
import VenueReactButton from './VenueReactButton';

const VenueCard = ({ venue }: { venue: Venue }) => {
  const handleStartNavigation = (destination: Location) => {
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  return (
    <View style={VenueCardStyles.venueCardContainer}>
      <Text style={VenueCardStyles.venueName}>{venue.name}</Text>
      <View style={VenueCardStyles.venueDetailsContainer}>
        <View>
          <Text style={VenueCardStyles.venueAddress}>{venue.address}</Text>
          <Text style={VenueCardStyles.venueDistance}>0.3 miles</Text>
          <View style={VenueCardStyles.reactButtonsContainer}>
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
          style={VenueCardStyles.navigateButton}>
          <Text style={VenueCardStyles.navigateButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default VenueCard;
