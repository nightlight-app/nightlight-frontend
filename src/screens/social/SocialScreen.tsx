import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Image,
  RefreshControl,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  NativeStackScreenProps,
  SocialRoute,
  TabRoute,
  User,
} from '@nightlight/src/types';
import SocialScreenStyles from '@nightlight/screens/social/SocialScreen.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import { COLORS } from '@nightlight/src/global.styles';

const SocialScreen = ({ navigation }: NativeStackScreenProps) => {
  // current user ID
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  const [friends, setFriends] = useState<User[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // fetches user's list of friends
  const fetchFriends = async () => {
    try {
      const response = await customFetch({
        resourceUrl: `/users/${userId}/friends/`,
        options: {
          method: 'GET',
        },
      });

      setFriends(response.friends);
    } catch (error) {
      console.error(
        '[Social Screen] A problem occured while fetching friends:',
        error
      );
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchFriends();
    setIsRefreshing(false);
  }, []);

  // fetch friends
  useEffect(() => {
    fetchFriends();
  }, []);

  const handleNavigateToFindFriends = () => {
    navigation.navigate(SocialRoute.FRIEND_SEARCH);
  };

  const handleNavigateToNotifications = () => {
    navigation.navigate(SocialRoute.NOTIFICATIONS);
  };

  const renderFriendItem = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === friends.length - 1;
    const imgUrl = item.imgUrlProfileSmall;

    return (
      <View
        style={[
          SocialScreenStyles.itemContainer,
          isFirstItem && SocialScreenStyles.topItem,
          isLastItem && SocialScreenStyles.bottomItem,
        ]}>
        <View style={SocialScreenStyles.userInfoContainer}>
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={SocialScreenStyles.profileImage}
            />
          ) : (
            <View style={SocialScreenStyles.profileImage}>
              <Text style={SocialScreenStyles.userName}>
                {item.firstName[0]} {item.lastName[0]}
              </Text>
            </View>
          )}
          <Text style={SocialScreenStyles.userName}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </View>
    );
  };

  const renderItemSeparator = () => (
    <View style={SocialScreenStyles.itemSeparator} />
  );

  const renderEmptyFriendsList = () => (
    <View style={SocialScreenStyles.emptyAvailableUsersContainer}>
      <Text style={SocialScreenStyles.emptyAvailableUsersText}>
        Well, what are you waiting for? Go make some friends!
      </Text>
      <TouchableOpacity
        onPress={handleNavigateToFindFriends}
        style={SocialScreenStyles.addFriendsButton}
        activeOpacity={0.75}>
        <Text style={SocialScreenStyles.addFriendsButtonText}>
          + Add Friends
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      testID={TabRoute.SOCIAL_STACK}
      style={SocialScreenStyles.container}>
      <View style={SocialScreenStyles.contentContainer}>
        {/* Header */}
        <View style={SocialScreenStyles.header}>
          <TouchableOpacity
            style={SocialScreenStyles.headerButton}
            onPress={handleNavigateToNotifications}
            activeOpacity={0.75}>
            <Feather name='bell' size={26} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={SocialScreenStyles.title}>Social</Text>
          <TouchableOpacity
            style={SocialScreenStyles.headerButton}
            onPress={handleNavigateToFindFriends}
            activeOpacity={0.75}>
            <Ionicons name='person-add' size={26} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          indicatorStyle='white'
          contentContainerStyle={SocialScreenStyles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.GRAY}
            />
          }>
          {/* All friends */}
          <View style={SocialScreenStyles.sectionHeader}>
            <Text style={SocialScreenStyles.sectionHeaderTitle}>
              All Friends
            </Text>
            <View style={SocialScreenStyles.sectionHeaderCountContainer}>
              <Text style={SocialScreenStyles.sectionHeaderCount}>
                {friends.length}
              </Text>
            </View>
          </View>
          <FlatList
            style={SocialScreenStyles.friendsList}
            data={friends}
            renderItem={renderFriendItem}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderEmptyFriendsList}
            scrollEnabled={false}
            indicatorStyle='white'
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SocialScreen;
