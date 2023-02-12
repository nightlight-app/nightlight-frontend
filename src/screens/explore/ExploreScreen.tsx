import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './ExploreScreen.styles';
import ExploreCard from "components/explore/ExploreCard";

const ExploreScreen = () => {
  const [clubs, setClubs] = useState();

  useEffect(() => {
    let options = {
      headers: {
        Authorization:
          'Bearer ZzBZjUbtVGqDJf9_jkyLrazXSh_iGyfGbznPiPVMOPFCv9nHIzlCn3OK7L40JPSvwmNGLNZNKjJzoE-2UmDIM_I_zU7O-NvNsYH9nJsyjOyLCdv1Zm3z-oddfjPbY3Yx',
      },
    };
    fetch(
      'https://api.yelp.com/v3/businesses/search?term=clubs&latitude=36.144151&longitude=-86.800949&limit=30',
      options
    )
      .then(res => res.json())
      .then(data => {
        setClubs(data.businesses);
      });
  }, []);

  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular
  });

  if (fontsLoaded) {
    //TODO MAKE FONT SMALLER IF ABOVE A CERTAIN # OF CHARS
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.search}>
        <Text style={styles.searchText}>Click to explore...</Text>
      </View>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.trending}>
        <ExploreCard name='Jason Aldeans' address='10 Broadway'distance='0.1m' ></ExploreCard>
        <ExploreCard name='Tin Roof' address='134 Demonbreun St'distance='0.1m'  ></ExploreCard>
        <View style={styles.seeMore}>
          <Text style={styles.seeMoreText}>See more...</Text>
        </View>
      </View>
       <View style={styles.barContainer}>
       <FlatList
        data={clubs}
        renderItem={({ item }) => (
          <ExploreCard name={item.name} address={item.location.address1} distance={'na'}></ExploreCard>
        )}
        keyExtractor={item => item.name}
      />
       </View>
    </ScrollView>
  );
};
}

export default ExploreScreen;

