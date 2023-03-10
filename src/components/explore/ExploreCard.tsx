import { View, Text, Pressable } from 'react-native';
import styles from '@nightlight/components/explore/ExploreCard.styles';
import VenueReaction from '@nightlight/components/venue-reaction/VenueReaction';
import { ExploreCardProps } from '@nightlight/src/types';

const ExploreCard = (Props: ExploreCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.venueTitle}>{Props.name}</Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.reactionContainer}>
          <Text style={styles.venueAddress}>{Props.address}</Text>
          <View style={styles.reactionGroup}>
            <VenueReaction emoji='🔥' value={8} active={false} />
            <VenueReaction emoji='😄' value={2} active={true} />
            <VenueReaction emoji='🎉' value={12} active={false} />
            <VenueReaction emoji='⚠️' value={5} active={false} />
            <VenueReaction emoji='💩' value={11} active={false} />
          </View>
        </View>
        <Pressable
          style={styles.goButton}
          onPress={() =>
            console.log('latitude: ', Props.lat, 'longitude: ', Props.long)
          }>
          <Text style={styles.goButtonText}>GO</Text>
          <Text style={styles.goButtonSubText}>0.1m</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExploreCard;
