import { BottomTabScreenProps, SocialRoute, User } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ListRenderItemInfo,
  FlatList,
  Pressable,
} from 'react-native';
import FriendSearchScreenStyles from '@nightlight/screens/social/FriendSearchScreen.styles';
import SearchUserCard from '@nightlight/components/social/SearchUserCard';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

const FriendSearchScreen = ({ navigation }: BottomTabScreenProps) => {
  const { userDocument } = useAuthContext();
  // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const handleSearchChange = (text: string) => setSearchInput(text);
  const [page, setPage] = useState(1);

  // TODO: improve search algorithm?
  useEffect(() => {
    customFetch({
      resourceUrl: `/users/search/?query=${searchInput}&count=${300}&page=${page}`,
      options: {
        method: 'GET',
      },
    })
      .then(response => {
        setDisplayedUsers(response.users);
        // TODO: important! fix pagination
        // setPage(page + 1);
      })
      .catch(e => {
        console.error('Error: ', e.response.message);
        setDisplayedUsers([]);
      });
    setDisplayedUsers(
      displayedUsers.filter(
        (user: User) =>
          user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput]);

  // TODO: fix type?

  let myIndex = 0;
  const renderUser = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === displayedUsers.length - 1;

    const isAdded = userDocument && userDocument?.friends?.includes(item._id);

    // check if user has been requested
    const isRequested =
      userDocument && userDocument?.sentFriendRequests?.includes(item._id);

    // check if user is self
    if (userDocument?._id === item._id) {
      return null;
    } else {
      return (
        <Pressable
          onPress={() => {
            navigation.navigate(SocialRoute.FRIEND_PROFILE, { item });
          }}>
          <SearchUserCard
            index={myIndex++}
            firstName={item.firstName}
            lastName={item.lastName}
            isFirstItem={isFirstItem}
            isLastItem={isLastItem}
            isAdded={isAdded}
            isRequested={isRequested}
            image={
              item.imgUrlProfileSmall === undefined
                ? '@nightlight/assets/images/anon.png'
                : item.imgUrlProfileSmall
            }
            friendId={item._id}
          />
        </Pressable>
      );
    }
  };

  const renderUserSeparator = () => (
    <View style={FriendSearchScreenStyles.contactSeparator} />
  );

  const renderEmptyUsers = () => (
    <View style={FriendSearchScreenStyles.emptyContactsContainer}>
      <Text style={FriendSearchScreenStyles.emptyContactsText}>
        Hmm.. We can't seem to find any users with that name.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      testID={SocialRoute.FRIEND_SEARCH}
      style={FriendSearchScreenStyles.screenContainer}>
      <Text style={FriendSearchScreenStyles.title}>Friend Search</Text>
      <TextInput
        value={searchInput}
        onChangeText={handleSearchChange}
        style={FriendSearchScreenStyles.searchBar}
        placeholder='Search by name to find your friends!'
      />
      <FlatList
        style={FriendSearchScreenStyles.contactList}
        data={displayedUsers}
        renderItem={renderUser}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderUserSeparator}
        ListEmptyComponent={renderEmptyUsers}
        scrollEnabled={displayedUsers.length > 0}
        indicatorStyle='white'
      />
    </SafeAreaView>
  );
};

export default FriendSearchScreen;
