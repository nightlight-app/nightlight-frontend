import { View, Text, Button, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts, Comfortaa_600SemiBold } from '@expo-google-fonts/comfortaa';
import { useState } from 'react';

interface Props {
  emoji: string;
  value: number;
  active: boolean;
}

const VenueReaction = ({ emoji, value, active }: Props) => {
  const [isActive, setIsActive] = useState(active);

  let [fontsLoaded] = useFonts({
    Comfortaa_600SemiBold,
  });

  if (fontsLoaded) {
    return (
      <Pressable
        onPress={() => {
          setIsActive(!isActive);
        }}
        style={
          isActive ? styles.venueReactionActive : styles.venueReactionInactive
        }>
        <Text style={styles.venueText}>{emoji + ' ' + value}</Text>
      </Pressable>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  venueReactionInactive: {
    backgroundColor: '#525252',
    borderRadius: 10,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    marginLeft: 3,
    marginRight: 3,
  },
  venueReactionActive: {
    backgroundColor: '#4A86E8',
    borderRadius: 10,
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8,
    marginLeft: 3,
    marginRight: 3,
    shadowColor: '#4A86E8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  venueText: {
    color: 'white',
    fontFamily: 'Comfortaa_600SemiBold',
    fontSize: 11,
  },
});

export default VenueReaction;