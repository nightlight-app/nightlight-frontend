import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
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

const SocialScreen = ({ navigation }: BottomTabScreenProps) => {
  // current user ID
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  // number of members in active group
  const [groupCount, setGroupCount] = useState(0);
  const [activeGroup, setActiveGroup] = useState([]);

  // number of friends
  const [friends, setFriends] = useState<User[]>([]);

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

  // get active group and fetch friends
  useEffect(() => {
    fetchFriends();
  }, []);

  const handleNavigateToFindFriends = () => {
    navigation.navigate(SocialRoute.FRIEND_SEARCH);
  };

  const handleNavigateToNotifications = () => {
    navigation.navigate(SocialRoute.NOTIFICATIONS);
  };

  const renderEmptyActiveGroup = () => (
    <View>
      <Text style={SocialScreenStyles.emptyAvailableUsersText}>
        No active group
      </Text>
    </View>
  );

  const renderContactSeparator = () => (
    <View style={SocialScreenStyles.contactSeparator} />
  );

  return (
    <SafeAreaView
      testID={TabRoute.SOCIAL_STACK}
      style={SocialScreenStyles.container}>
      <View style={SocialScreenStyles.contentContainer}>
        <View style={SocialScreenStyles.header}>
          <TouchableOpacity
            style={SocialScreenStyles.headerButton}
            onPress={handleNavigateToNotifications}
            activeOpacity={0.75}>
            {/* <NotificationSvg /> */}
            <Feather name='bell' size={30} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={SocialScreenStyles.title}>Social</Text>
          <TouchableOpacity
            style={SocialScreenStyles.headerButton}
            onPress={handleNavigateToFindFriends}
            activeOpacity={0.75}>
            {/* <AddFriendsSvg /> */}
            <Ionicons name='person-add' size={30} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        <ScrollView indicatorStyle='white' style={{ paddingHorizontal: 10 }}>
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
            renderItem={({ item }) => <Text>{item.firstName}</Text>}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={renderContactSeparator}
            // ListEmptyComponent={renderEmptyFriendsList}
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
