import { useEffect, useState } from 'react';
import { ScrollView, Text, View, SafeAreaView, TextInput } from 'react-native';
import styles from './ExploreScreen.styles';
import ExploreCard from '@nightlight/components/explore/ExploreCard';
import axios from 'axios';
import { Route } from '@nightlight/src/types';

const ExploreScreen = () => {
  // keep track of list of venues queried
  const [venues, setVenues] = useState([]);

  // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');

  // fetch venues on first render
  useEffect(() => {
    axios
      .get(`http://localhost:6060/venues`)
      .then(response => {
        setVenues(response.data.venues);
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  }, []);

  return (
    <View testID={Route.EXPLORE} style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <ScrollView>
          <Text style={styles.title}>Explore</Text>
          <View style={styles.search}>
            <TextInput
              value={searchInput}
              onChangeText={(text: string) => setSearchInput(text)}
              style={styles.searchText}
              placeholder='Click to explore...'></TextInput>
          </View>
          <View style={styles.trendbox}>
            <Text style={styles.trendingText}>🔥 Trending </Text>
            <View style={styles.reactionContainer}>
              <View style={styles.reactionBox}>
                <Text style={styles.allText}>All</Text>
              </View>
              <View style={styles.reactionBox}>
                <Text>🔥</Text>
              </View>
              <View style={styles.reactionBox}>
                <Text>🕺</Text>
              </View>
              <View style={styles.reactionBox}>
                <Text>🎉</Text>
              </View>
              <View style={styles.reactionBox}>
                <Text>⚠️</Text>
              </View>
              <View style={styles.reactionBox}>
                <Text>💩</Text>
              </View>
            </View>
          </View>
          <View style={styles.trending}>
            <ExploreCard
              name='Jason Aldeans'
              address='10 Broadway'
              lat='0.1m'
              long='0.1m'></ExploreCard>
            <ExploreCard
              name='Tin Roof'
              address='134 Demonbreun St'
              lat='0.1m'
              long='0.1m'></ExploreCard>
            <View style={styles.seeMore}>
              <Text style={styles.seeMoreText}>See more...</Text>
            </View>
          </View>
          <View style={styles.barContainer}>
            {venues
              .filter(
                (item: {
                  name: string;
                  address: string;
                  lat: string;
                  long: string;
                  location: { latitude: string; longitude: string };
                }) => {
                  if (searchInput === '') {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(searchInput.toLowerCase())
                  ) {
                    return item;
                  }
                }
              )
              .map(
                (item: {
                  name: string;
                  address: string;
                  lat: string;
                  long: string;
                  location: { latitude: string; longitude: string };
                }) => (
                  <ExploreCard
                    name={item.name}
                    address={item.address}
                    lat={item.location.latitude}
                    long={item.location.longitude}></ExploreCard>
                )
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ExploreScreen;
