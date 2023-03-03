import { useEffect, useState } from 'react';
import { ScrollView, Text, View, SafeAreaView, TextInput } from 'react-native';
import ExploreScreenStyles from '@nightlight/screens/explore/ExploreScreen.styles';
import ExploreCard from '@nightlight/components/explore/ExploreCard';
import axios from 'axios';
import { Route } from '@nightlight/src/types';

const ExploreScreen = () => {
  // keep track of list of venues queried
  const [venues, setVenues] = useState([]);

  // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');

  // keep track of what page user is on
  const [page, setPage] = useState(1);

  // pagination query params
  const params = {
    count: 10,
    page: page,
    userID: '64017efe666fed2069564706'
  };

  //TODO IMPORTANT!! make a load more button to continue pagination

  // fetch venues on first render
  useEffect(() => {
    // TODO: figure out backend and fallback response if no venues received
    axios
      .get(
        `http://localhost:6060/venues/?count=${params.count}&page=${params.page}&userId=${params.userID}`
      )
      .then(response => {
        setPage(page + 1);
        setVenues(response.data.venues);
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  }, []);

  return (
    <View testID={Route.EXPLORE} style={ExploreScreenStyles.container}>
      <SafeAreaView style={ExploreScreenStyles.safeview}>
        {/* Title and search */}
        <View style={ExploreScreenStyles.headerContainer}>
          <Text style={ExploreScreenStyles.title}>Explore</Text>
          <View style={ExploreScreenStyles.search}>
            <TextInput
              value={searchInput}
              onChangeText={(text: string) => setSearchInput(text)}
              style={ExploreScreenStyles.searchText}
              placeholder='Click to explore...'></TextInput>
          </View>
        </View>

        {/* Scrollable view */}
        <ScrollView>
          <View style={ExploreScreenStyles.trendbox}>
            <Text style={ExploreScreenStyles.trendingText}>🔥 Trending </Text>
            <View style={ExploreScreenStyles.reactionContainer}>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text style={ExploreScreenStyles.allText}>All</Text>
              </View>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text>🔥</Text>
              </View>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text>🕺</Text>
              </View>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text>🎉</Text>
              </View>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text>⚠️</Text>
              </View>
              <View style={ExploreScreenStyles.reactionBox}>
                <Text>💩</Text>
              </View>
            </View>
          </View>
          <View style={ExploreScreenStyles.trending}>
            {/* TODO: currently hard coding explore cards */}
            <ExploreCard
              name='Jason Aldeans'
              address='10 Broadway'
              lat='0.1m'
              long='0.1m'
            />
            <ExploreCard
              name='Tin Roof'
              address='134 Demonbreun St'
              lat='0.1m'
              long='0.1m'
            />
            {/* TODO: turn this into a pressable */}
            <View style={ExploreScreenStyles.seeMore}>
              <Text style={ExploreScreenStyles.seeMoreText}>See more...</Text>
            </View>
          </View>

          {/* Filter venues by search */}
          <View style={ExploreScreenStyles.barContainer}>
            {venues
              .filter(
                (item: {
                  name: string;
                  address: string;
                  lat: string;
                  long: string;
                  location: { latitude: string; longitude: string };
                }) => {
                  if (searchInput === '') return item;
                  else if (
                    item.name.toLowerCase().includes(searchInput.toLowerCase())
                  )
                    return item;
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
