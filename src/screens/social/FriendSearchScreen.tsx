import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ListRenderItemInfo,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { SocialRoute, SocialStackParamList, User } from '@nightlight/src/types';
import FriendSearchScreenStyles from '@nightlight/screens/social/FriendSearchScreen.styles';
import SearchUserCard from '@nightlight/components/social/SearchUserCard';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import { COLORS } from '@nightlight/src/global.styles';

const FriendSearchScreen = ({
  navigation,
}: NativeStackScreenProps<SocialStackParamList, SocialRoute.FRIEND_SEARCH>) => {
  const { userSession, userDocument, updateUserDocument } = useAuthContext();

  const [searchInput, setSearchInput] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await customFetch({
        resourceUrl: `/users/search/?query=${searchInput}&count=${300}&page=${page}`,
        options: {
          method: 'GET',
        },
      });

      setUsers(response.users);
    } catch (error) {
      console.error(
        '[FriendSearchScreen] A problem occured while fetching users:',
        error
      );
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (userSession) updateUserDocument(userSession); // in case friends list has changed (other user has accepted/declined a friend request)
    fetchUsers();
  }, []);

  useEffect(() => {
    // sort users alphabetically by first and last name
    let filteredUsers = [...users].sort((a: User, b: User) =>
      (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName)
    );

    // filter users by search input
    // TODO: improve search algorithm?
    if (searchInput) {
      filteredUsers = filteredUsers.filter(
        (user: User) =>
          user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // filter out self
    filteredUsers = filteredUsers.filter(
      (user: User) => user._id !== userDocument?._id
    );

    setDisplayedUsers(filteredUsers);
  }, [users, searchInput]);

  const handleSearchChange = (text: string) => setSearchInput(text);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderUserItem = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem: boolean = index === 0;
    const isLastItem: boolean = index === displayedUsers.length - 1;

    return (
      <SearchUserCard
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
        user={item}
      />
    );
  };

  const renderItemSeparator = () => (
    <View style={FriendSearchScreenStyles.itemSeparator} />
  );

  const renderEmptyUsers = () => (
    <View style={FriendSearchScreenStyles.emptyUsersContainer}>
      <Text style={FriendSearchScreenStyles.emptyUsersText}>
        Seems a bit empty here... 🦗
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      testID={SocialRoute.FRIEND_SEARCH}
      style={FriendSearchScreenStyles.container}>
      <View style={FriendSearchScreenStyles.contentContainer}>
        <View style={FriendSearchScreenStyles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={FriendSearchScreenStyles.headerButton}
            activeOpacity={0.75}>
            <AntDesign name='left' size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={FriendSearchScreenStyles.title}>Find Friends</Text>
        </View>
        <TextInput
          value={searchInput}
          onChangeText={handleSearchChange}
          style={FriendSearchScreenStyles.searchBar}
          placeholder='Search by name to find your friends!'
        />
        <FlatList
          style={FriendSearchScreenStyles.userList}
          contentContainerStyle={FriendSearchScreenStyles.userListContent}
          data={displayedUsers}
          renderItem={renderUserItem}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={renderItemSeparator}
          ListEmptyComponent={renderEmptyUsers}
          indicatorStyle='white'
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.GRAY}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendSearchScreen;
