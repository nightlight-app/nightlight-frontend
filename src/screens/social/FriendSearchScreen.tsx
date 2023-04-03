import { SocialRoute, User } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ListRenderItemInfo, FlatList } from 'react-native';
import FriendSearchScreenStyles from './FriendSearchScreen.styles';
import { TEST_USERS } from '@nightlight/src/testData';
import SearchUserCard from '@nightlight/components/social/UserCard';

const FriendSearchScreen = () => {
//TODO need to pull users from backend
let users = TEST_USERS;

// get users from backend
// useEffect(() => {


// })


     // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedUsers, setDisplayedUsers] =
  useState<User[]>(users);
  const handleSearchChange = (text: string) => setSearchInput(text);


  // TODO: improve search algorithm?
  useEffect(() => {
    if (!searchInput) setDisplayedUsers(users);
    else
      setDisplayedUsers(
        users.filter((user: User) =>
          user.firstName.toLowerCase().includes(searchInput.toLowerCase()) || user.lastName.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
  }, [searchInput]);

   // TODO: fix type?
   const renderUser = ({
    item,
    index,
  }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === users.length - 1;

    return (
      <SearchUserCard
        index={index}
        firstName={item.firstName}
        lastName = {item.lastName}
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
        isAdded = {false}
      />
    );
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
