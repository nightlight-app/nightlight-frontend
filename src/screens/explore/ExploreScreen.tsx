import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '@env';
import ExploreScreenStyles from '@nightlight/screens/explore/ExploreScreen.styles';
import {
  Location,
  ReactionEmoji,
  TabRoute,
  Venue,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

enum ExploreSortFilter {
  ALL = 'All',
  TRENDING = 'Trending',
}

const ExploreScreen = () => {
  const [venues, setVenues] = useState<Venue[]>([]); // keep track of list of venues queried
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]); // keep track of filtered list of venues
  const [searchInput, setSearchInput] = useState<string>(''); // keep track of user's search input
  const [sortFilter, setSortFilter] = useState<
    ExploreSortFilter | ReactionEmoji
  >(ExploreSortFilter.ALL); // sort by filter
  const [page, setPage] = useState<number>(1); // keep track of what page user is on

  const { userDocument } = useAuthContext();

  // TODO: pagination query params
  const params = {
    count: 10,
    page: page,
  };

  // TODO: IMPORTANT!! make a load more button to continue pagination

  useEffect(() => {
    console.log(
      `[Explore] Searching venues by '${searchInput}' and sorting venues by '${sortFilter}'...`
    );

    let tempVenues = venues;

    if (tempVenues.length > 0) {
      // search venues by name or address
      if (searchInput)
        tempVenues = tempVenues.filter(
          venue =>
            venue.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            venue.address.toLowerCase().includes(searchInput.toLowerCase()) // should we keep search by address?
        );

      // sort by filter
      // TODO: extract sort functions to utils
      switch (sortFilter) {
        case ExploreSortFilter.ALL:
          // TODO: sort by distance
          Alert.alert('Sort by distance not implemented yet! :(');
          break;
        case ExploreSortFilter.TRENDING:
          tempVenues = tempVenues.sort(
            (venueA, venueB) =>
              Object.values(venueB.reactions)
                .map(reaction => reaction.count)
                .reduce((acc, count) => acc + count, 0) -
              Object.values(venueA.reactions)
                .map(reaction => reaction.count)
                .reduce((acc, count) => acc + count, 0)
          );
          break;
        case ReactionEmoji.FIRE:
        case ReactionEmoji.WARNING:
        case ReactionEmoji.SHIELD:
        case ReactionEmoji.POOP:
        case ReactionEmoji.PARTY:
          // FIXME: sometimes getting error: TypeError: Cannot read property 'count' of undefined
          tempVenues = tempVenues.sort(
            (venueA, venueB) =>
              venueB.reactions[sortFilter as ReactionEmoji].count -
              venueA.reactions[sortFilter as ReactionEmoji].count
          );
          break;
        default:
          console.error('[Explore] Invalid sort filter: ', sortFilter);
          break;
      }
    }

    setFilteredVenues(tempVenues);
  }, [venues, sortFilter, searchInput]);

  // fetch venues on first render
  useEffect(() => {
    // TODO: figure out backend and fallback response if no venues received
    console.log('[Explore] Fetching venues...');
    axios
      .get(
        `${SERVER_URL}/venues/?count=${params.count}&page=${params.page}&userId=${userDocument?._id}`
      )
      .then(response => {
        console.log('[Explore] Venues fetched!');
        setPage(page + 1);
        setVenues(response.data.venues);
      })
      .catch(e => {
        console.log('[Explore]', JSON.stringify(e));
      });
  }, []);

  const handleStartNavigation = (destination: Location) => {
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  const handleToggleReaction = (emoji: ReactionEmoji) => {
    // TODO:
  };

  const renderVenueCard = ({ item }: ListRenderItemInfo<Venue>) => (
    <View style={ExploreScreenStyles.venueCardContainer}>
      <Text style={ExploreScreenStyles.venueName}>{item.name}</Text>
      <View style={ExploreScreenStyles.venueDetailsContainer}>
        <View>
          <Text style={ExploreScreenStyles.venueAddress}>{item.address}</Text>
          <Text style={ExploreScreenStyles.venueDistance}>0.3 miles</Text>
          <View style={ExploreScreenStyles.reactButtonsContainer}>
            {Object.keys(item.reactions).map((emoji, index) => {
              const { count, didReact } =
                item.reactions[emoji as ReactionEmoji];

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.75}
                  style={[
                    ExploreScreenStyles.reactButtonContainer,
                    didReact && ExploreScreenStyles.buttonActive,
                  ]}
                  onPress={() => handleToggleReaction(emoji as ReactionEmoji)}>
                  <Text style={ExploreScreenStyles.reactButtonEmoji}>
                    {emoji}
                  </Text>
                  <Text style={ExploreScreenStyles.reactButtonCount}>
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => handleStartNavigation(item.location)}
          style={ExploreScreenStyles.navigateButton}>
          <Text style={ExploreScreenStyles.navigateButtonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVenueCardSeparator = () => (
    <View style={ExploreScreenStyles.venueCardSeparator} />
  );

  return (
    <SafeAreaView
      testID={TabRoute.EXPLORE}
      style={ExploreScreenStyles.container}>
      <View style={ExploreScreenStyles.contentContainer}>
        <Text style={ExploreScreenStyles.title}>Explore</Text>
        <TextInput
          placeholder="Let's explore..."
          value={searchInput}
          onChangeText={setSearchInput}
          style={ExploreScreenStyles.searchBar}
        />
        <View style={ExploreScreenStyles.filtersContainer}>
          {Object.values({ ...ExploreSortFilter, ...ReactionEmoji }).map(
            (currentFilter, index) => {
              const isActive = currentFilter === sortFilter;

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.75}
                  onPress={() => setSortFilter(currentFilter)}
                  style={[
                    ExploreScreenStyles.filterButton,
                    isActive && ExploreScreenStyles.buttonActive,
                  ]}>
                  <Text
                    style={[
                      ExploreScreenStyles.filterText,
                      ExploreScreenStyles.filterTextActive,
                    ]}>
                    {currentFilter}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>
        <FlatList
          style={ExploreScreenStyles.venueList}
          contentContainerStyle={ExploreScreenStyles.venueListContent}
          data={filteredVenues}
          renderItem={renderVenueCard}
          keyExtractor={venue => venue._id}
          ItemSeparatorComponent={renderVenueCardSeparator}
          indicatorStyle='white'
        />
      </View>
    </SafeAreaView>

    //       <View style={ExploreScreenStyles.trending}>
    //         {/* TODO: currently hard coding trending explore cards */}
    //         {/* <ExploreCard
    //           name='Jason Aldeans'
    //           address='10 Broadway'
    //           lat='0.1m'
    //           long='0.1m'
    //           reactions = {{'🔥': 3, '🕺': 2, '🎉': 12, '⚠️': 5, '💩': 11}}
    //         />
    //         <ExploreCard
    //           name='Tin Roof'
    //           address='134 Demonbreun St'
    //           lat='0.1m'
    //           long='0.1m'
    //           reactions = {{'🔥': 3, '🕺': 2, '🎉': 12, '⚠️': 5, '💩': 11}}
    //         /> */}
    //         {/* TODO: turn this into a pressable */}
    //         <View style={ExploreScreenStyles.seeMore}>
    //           <Text style={ExploreScreenStyles.seeMoreText}>See more...</Text>
    //         </View>
    //       </View>

    //       {/* Filter venues by search */}
    //       <View style={ExploreScreenStyles.barContainer}>
    //         {venues
    //           .filter(
    //             (item: {
    //               name: string;
    //               address: string;
    //               lat: string;
    //               long: string;
    //               location: { latitude: string; longitude: string };
    //             }) => {
    //               if (searchInput === '') return item;
    //               else if (
    //                 item.name.toLowerCase().includes(searchInput.toLowerCase())
    //               )
    //                 return item;
    //             }
    //           )
    //           .sort((a: Venue, b: Venue) => {
    //             if (selectedEmoji === '') {
    //               return 0;
    //             }
    //             const aReaction =
    //               a.reactions && a.reactions[selectedEmoji]
    //                 ? a.reactions[selectedEmoji]
    //                 : 0;
    //             const bReaction =
    //               b.reactions && b.reactions[selectedEmoji]
    //                 ? b.reactions[selectedEmoji]
    //                 : 0;
    //             return bReaction - aReaction;
    //           })
    //           .map(
    //             (
    //               item: {
    //                 name: string;
    //                 address: string;
    //                 lat: string;
    //                 long: string;
    //                 location: { latitude: string; longitude: string };
    //                 reactions: Object;
    //                 _id: string;
    //               },
    //               index
    //             ) => (
    //               <ExploreCard
    //                 key={item.name}
    //                 name={item.name}
    //                 address={item.address}
    //                 lat={item.location.latitude}
    //                 long={item.location.longitude}
    //                 reactions={item.reactions}
    //                 id={item._id}
    //               />
    //             )
    //           )}
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </View>
  );
};

export default ExploreScreen;
