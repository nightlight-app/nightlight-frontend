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
import FriendCard from '@nightlight/components/social/FriendCard';
import AddFriendsSvg from '@nightlight/components/svgs/AddFriendsSvg';
import NotificationSvg from '@nightlight/components/svgs/NotificationSvg';
import {
  BottomTabScreenProps,
  SocialRoute,
  TabRoute,
  User,
} from '@nightlight/src/types';
import SocialScreenStyles from '@nightlight/screens/social/SocialScreen.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import { COLORS } from '@nightlight/src/global.styles';
import { getStatusColor } from '@nightlight/src/utils/utils';

const SocialScreen = ({ navigation }: BottomTabScreenProps) => {
  // current user ID
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  const [activeGroupMembers, setActiveGroupMembers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // TODO: populate user current group with members (in backend) so we don't have to fetch them here
  // fetches user's active group members
  const fetchActiveGroupMembers = async () => {
    if (!userDocument?.currentGroup) {
      console.log('[Social Screen] User has no active group');
      return;
    }

    try {
      const response = await customFetch({
        resourceUrl: `/groups?groupId=${userDocument.currentGroup}`,
        options: {
          method: 'GET',
        },
      });

      setActiveGroupMembers(response.group.members);
    } catch (error) {
      console.error(
        '[Social Screen] A problem occured while fetching active group members:',
        error
      );
    }
  };

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
    // fetchActiveGroupMembers();
    fetchFriends();
    setIsRefreshing(false);
  }, []);

  // get active group and fetch friends
  useEffect(() => {
    // fetchActiveGroupMembers();
    fetchFriends();
  }, []);

  const handleNavigateToFindFriends = () => {
    navigation.navigate(SocialRoute.FRIEND_SEARCH);
  };

  const handleNavigateToNotifications = () => {
    navigation.navigate(SocialRoute.NOTIFICATIONS);
  };

  // const renderGroupMemberItem = ({ item, index }: ListRenderItemInfo<User>) => {
  //   const isFirstItem = index === 0;
  //   const isLastItem = index === activeGroupMembers.length - 1;
  //   const imgUrl = item.imgUrlProfileSmall;
  //   const statusColor = getStatusColor(item.lastActive.time);

  //   return (
  //     <View
  //       style={[
  //         SocialScreenStyles.itemContainer,
  //         isFirstItem && SocialScreenStyles.topItem,
  //         isLastItem && SocialScreenStyles.bottomItem,
  //       ]}>
  //       <View style={SocialScreenStyles.userInfoContainer}>
  //         {imgUrl ? (
  //           <Image
  //             source={{ uri: imgUrl }}
  //             style={[
  //               SocialScreenStyles.profileImage,
  //               {
  //                 borderColor: statusColor,
  //               },
  //             ]}
  //           />
  //         ) : (
  //           <View style={SocialScreenStyles.profileImage}>
  //             <Text style={SocialScreenStyles.userName}>
  //               {item.firstName[0]} {item.lastName[0]}
  //             </Text>
  //           </View>
  //         )}
  //         <Text style={SocialScreenStyles.userName}>
  //           {item.firstName} {item.lastName}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  const renderFriendItem = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === friends.length - 1;
    const imgUrl = item.imgUrlProfileSmall;
    const statusColor = getStatusColor(item.lastActive.time);

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
              style={[
                SocialScreenStyles.profileImage,
                {
                  borderColor: statusColor,
                },
              ]}
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
            {/* <NotificationSvg /> */}
            <Feather name='bell' size={26} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={SocialScreenStyles.title}>Social</Text>
          <TouchableOpacity
            style={SocialScreenStyles.headerButton}
            onPress={handleNavigateToFindFriends}
            activeOpacity={0.75}>
            {/* <AddFriendsSvg /> */}
            <Ionicons name='person-add' size={26} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          indicatorStyle='white'
          style={{ paddingHorizontal: 10 }}
          contentContainerStyle={SocialScreenStyles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {/* Active group */}
          {/* <View style={SocialScreenStyles.sectionHeader}>
            <Text
              style={[
                SocialScreenStyles.sectionHeaderTitle,
                SocialScreenStyles.activeGroupSectionTitle,
              ]}>
              Active Group
            </Text>
            <View
              style={[
                SocialScreenStyles.sectionHeaderCountContainer,
                SocialScreenStyles.activeGroupCountContainer,
              ]}>
              <Text style={SocialScreenStyles.sectionHeaderCount}>
                {activeGroupMembers.length}
              </Text>
            </View>
          </View>
          <FlatList
            style={SocialScreenStyles.friendsList}
            data={activeGroupMembers}
            renderItem={renderGroupMemberItem}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={renderItemSeparator}
            scrollEnabled={false}
            indicatorStyle='white'
          /> */}

          {/* All friends */}
          <View style={SocialScreenStyles.sectionHeader}>
            <Text
              style={[
                SocialScreenStyles.sectionHeaderTitle,
                SocialScreenStyles.friendsSectionTitle,
              ]}>
              All Friends
            </Text>
            <View
              style={[
                SocialScreenStyles.sectionHeaderCountContainer,
                SocialScreenStyles.friendsCountContainer,
              ]}>
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

          {/* <View style={SocialScreenStyles.rowView}>
            <Text style={SocialScreenStyles.activeGroupText}>Active Group</Text>
            <View style={SocialScreenStyles.greenCircle}>
              <Text style={SocialScreenStyles.numberText}>{groupCount}</Text>
            </View>
          </View> */}
          {/* <View style={SocialScreenStyles.activeBox}>
            {groupCount === 0 && renderEmptyGroup()}
            {activeGroup.map((item: { name: string }, index) => (
              <FriendCard
                key={index}
                index={index}
                name={item.name}
                isInGroup
                imgUrl='@nightlight/assets/images/anon.png'
              />
            ))}
            {/* TODO add glow  */}
          {/* <View style={SocialScreenStyles.glow} /> */}
          {/* </View> */}
          {/* <View style={SocialScreenStyles.rowView}>
            <Text style={SocialScreenStyles.allFriendsText}>All Friends</Text>
            <View style={SocialScreenStyles.grayCircle}>
              <Text style={SocialScreenStyles.numberText}>
                {friends.length}
              </Text>
            </View>
          </View>
          <View style={SocialScreenStyles.friendBox}>
            {friends.map(
              (
                item: {
                  firstName: string;
                  lastName: string;
                  imgUrlProfileSmall: string;
                },
                index
              ) => (
                <FriendCard
                  key={index}
                  index={index}
                  name={item.firstName + ' ' + item.lastName}
                  imgUrl={item.imgUrlProfileSmall}
                  isInGroup={false}
                />
              )
            )}
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SocialScreen;
