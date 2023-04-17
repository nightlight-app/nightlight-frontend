import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import ExploreScreenStyles from '@nightlight/screens/explore/ExploreScreen.styles';
import {
  ExploreSortFilter,
  ReactionEmoji,
  TabRoute,
  Venue,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import ExploreCard from '@nightlight/components/explore/ExploreCard';
import { customFetch } from '@nightlight/src/api';

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

  // filter / sort venues on search input or sort filter change
  useEffect(() => {
    let tempVenues = venues;

    if (venues?.length > 0) {
      console.log(
        `[Explore] Searching venues by '${searchInput}' and sorting venues by '${sortFilter}'...`
      );

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
          console.log(
            '[Explore] TODO: sort by distance has not been implemented yet :('
          );
          break;
        case ExploreSortFilter.TRENDING:
          tempVenues.sort(
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
          // FIXME: getting error when sortFilter is 🛡️
          try {
            tempVenues = tempVenues.sort(
              (venueA, venueB) =>
                venueB.reactions[sortFilter as ReactionEmoji].count -
                venueA.reactions[sortFilter as ReactionEmoji].count
            );
          } catch (e) {
            console.error(
              `[Explore] Error sorting by reaction '${sortFilter}': `,
              e
            );
          }
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
    customFetch({
      resourceUrl: `/venues/?count=${params.count}&page=${params.page}&userId=${userDocument?._id}`,
      options: {
        method: 'GET',
      },
    })
      .then(response => {
        console.log('[Explore] Venues fetched!', response);
        setPage(page + 1);
        setVenues(response.venues);
      })
      .catch(e => {
        console.error('[Explore]', JSON.stringify(e));
      });
  }, []);

  const renderVenueCard = ({ item }: ListRenderItemInfo<Venue>) => (
    <ExploreCard venue={item} />
  );

  const renderVenueCardSeparator = () => (
    <View style={ExploreScreenStyles.venueCardSeparator} />
  );

  const renderEmptyVenues = () => (
    <View style={ExploreScreenStyles.emptyVenuesContainer}>
      <Text style={ExploreScreenStyles.emptyVenuesText}>
        Seems a bit empty here... 🦗
      </Text>
    </View>
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
          keyboardAppearance='dark'
          autoComplete='off'
          autoCorrect={false}
          clearButtonMode='while-editing'
          returnKeyType='search'
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
                    isActive && ExploreScreenStyles.filterButtonActive,
                  ]}>
                  <Text
                    style={[
                      ExploreScreenStyles.filterText,
                      isActive && ExploreScreenStyles.filterTextActive,
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
          ListEmptyComponent={renderEmptyVenues}
          scrollEnabled={filteredVenues.length > 0}
          ItemSeparatorComponent={renderVenueCardSeparator}
          indicatorStyle='white'
        />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
