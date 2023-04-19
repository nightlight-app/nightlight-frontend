import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
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
import Banner from '@nightlight/components/Banner';
import { customFetch } from '@nightlight/src/api';

const ExploreScreen = () => {
  const [venues, setVenues] = useState<Venue[]>([]); // keep track of list of venues queried
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]); // keep track of filtered list of venues
  const [searchInput, setSearchInput] = useState<string>(''); // keep track of user's search input
  const [sortFilter, setSortFilter] = useState<
    ExploreSortFilter | ReactionEmoji
  >(ExploreSortFilter.ALL); // sort by filter
  const [page, setPage] = useState<number>(1); // keep track of what page user is on
  const [errorMessage, setErrorMessage] = useState<string>(''); // keep track of error message
  const [refreshing, setRefreshing] = useState<boolean>(false); // keep track of whether user is refreshing list of venues

  const { userDocument } = useAuthContext();

  // TODO: pagination query params
  const params = {
    count: 10,
    page: page,
  };

  // TODO: IMPORTANT!! make a load more button to continue pagination

  const fetchVenues = async () => {
    // TODO: figure out backend and fallback response if no venues received
    console.log('[Explore] Fetching venues...');

    setErrorMessage('');

    try {
      const response = await customFetch({
        resourceUrl: `/venues/?count=${params.count}&page=${params.page}&userId=${userDocument?._id}`,
        options: {
          method: 'GET',
        },
      });

      console.log('[Explore] Venues fetched!');
      // setPage(page + 1);
      setVenues(response.venues);
    } catch (error) {
      setErrorMessage('Failed to fetch venues. Please try again later.');
      console.error('[Explore]', JSON.stringify(error));
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchVenues();
    setRefreshing(false);
  };

  // fetch venues on first render
  useEffect(() => {
    fetchVenues();
  }, []);

  // filter / sort venues on search input or sort filter change
  useEffect(() => {
    setErrorMessage('');

    let tempVenues = venues;

    if (venues.length > 0) {
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
          setErrorMessage('Invalid sort filter. Please try again later.');
          console.error('[Explore] Invalid sort filter: ', sortFilter);
          break;
      }
    }

    setFilteredVenues(tempVenues);
  }, [venues, sortFilter, searchInput]);

  const renderVenueCard = ({ item }: ListRenderItemInfo<Venue>) => (
    <ExploreCard
      venue={item}
      resetError={() => setErrorMessage('')}
      onError={() =>
        setErrorMessage('Failed to react to venue. Please try again later.')
      }
    />
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>

      {/* Error Banner */}
      {errorMessage && <Banner message={errorMessage} />}
    </SafeAreaView>
  );
};

export default ExploreScreen;
