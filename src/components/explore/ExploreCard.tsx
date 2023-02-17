import { View, Text, Pressable } from 'react-native';
import styles from './ExploreCard.styles';
import {
  useFonts,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import VenueReaction from '@nightlight/components/venue-reaction/VenueReaction';

type Props = {
  name: string;
  address: string;
  lat: string;
};

const ExploreCard = (Props: Props) => {
    let [fontsLoaded] = useFonts({
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
      });
    
      if (fontsLoaded) {
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
              <Pressable style={styles.goButton}>
                <Text style={styles.goButtonText}>GO</Text>
                <Text style={styles.goButtonSubText}>{Props.lat}</Text>
              </Pressable>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default ExploreCard;
