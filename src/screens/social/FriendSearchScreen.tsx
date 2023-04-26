import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ListRenderItemInfo,
  FlatList,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  Image,
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
  const { userDocument } = useAuthContext();

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

    setDisplayedUsers(filteredUsers);
  }, [users, searchInput]);

  const handleSearchChange = (text: string) => setSearchInput(text);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleUserPress = (user: User) => {
    navigation.navigate(SocialRoute.USER_PROFILE, { user });
  };

  // // TODO: fix type?

  // let myIndex = 0;
  // const renderUser = ({ item, index }: ListRenderItemInfo<User>) => {
  //   const isFirstItem = index === 0;
  //   const isLastItem = index === displayedUsers.length - 1;

  //   const isAdded = (userDocument &&
  //     userDocument?.friends?.includes(item._id)) as boolean;

  //   // check if user has been requested
  //   const isRequested = (userDocument &&
  //     userDocument.sentFriendRequests?.includes(item._id)) as boolean;

  //   // check if user is self
  //   if (userDocument?._id === item._id) {
  //     return null;
  //   } else {
  //     return (
  //       <Pressable
  //         onPress={() => {
  //           navigation.navigate(SocialRoute.USER_PROFILE, { user: item });
  //         }}>
  //         <SearchUserCard
  //           index={myIndex++}
  //           firstName={item.firstName}
  //           lastName={item.lastName}
  //           isFirstItem={isFirstItem}
  //           isLastItem={isLastItem}
  //           isAdded={isAdded}
  //           isRequested={isRequested}
  //           image={
  //             !item?.imgUrlProfileSmall
  //               ? '@nightlight/assets/images/anon.png'
  //               : item.imgUrlProfileSmall
  //           }
  //           friendId={item._id}
  //         />
  //       </Pressable>
  //     );
  //   }
  // };

  const renderUserItem = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === displayedUsers.length - 1;
    const imgUrl = item.imgUrlProfileSmall;

    return (
      <TouchableOpacity
        onPress={() => handleUserPress(item)}
        style={[
          FriendSearchScreenStyles.itemContainer,
          isFirstItem && FriendSearchScreenStyles.topItem,
          isLastItem && FriendSearchScreenStyles.bottomItem,
        ]}
        activeOpacity={0.75}>
        <View style={FriendSearchScreenStyles.userInfoContainer}>
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={FriendSearchScreenStyles.profileImage}
            />
          ) : (
            <View style={FriendSearchScreenStyles.profileImage}>
              <Text style={FriendSearchScreenStyles.userName}>
                {item.firstName[0] + item.lastName[0]}
              </Text>
            </View>
          )}
          <Text style={FriendSearchScreenStyles.userName}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
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
