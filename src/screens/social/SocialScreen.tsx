import FriendCard from '@nightlight/components/social/FriendCard';
import AddFriendsSvg from '@nightlight/components/svgs/AddFriendsSvg';
import NotificationSvg from '@nightlight/components/svgs/NotificationSvg';
import {
  BottomTabScreenProps,
  SocialRoute,
  TabRoute,
} from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import SocialScreenStyles from '@nightlight/screens/social/SocialScreen.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';

const SocialScreen = ({ navigation }: BottomTabScreenProps) => {
  // number of members in active group
  const [groupCount, setGroupCount] = useState(0);
  const [activeGroup, setActiveGroup] = useState([]);

  // user id
  const { userDocument } = useAuthContext();
  let userid = userDocument?._id;

  // number of friends
  const [friendCount, setFriendCount] = useState(0);
  const [friends, setFriends] = useState([]);

  // get active group and friend from backend
  useEffect(() => {
    //get friends
    customFetch({
      resourceUrl: `/users/${userid}/friends/`,
      options: {
        method: 'GET',
      },
    })
      .then(res => {
        setFriends(res.friends);
        setFriendCount(friends.length);
      })
      .catch(e => {
        console.error('Error: ', e);
      });

    //get active group
    // let groupid = userDocument?.currentGroup;
    // if (groupid) {
    //   customFetch({
    //     resourceUrl: `/groups/?groupId=${groupid}`,
    //     options: {
    //       method: 'GET',
    //     },
    //   })
    //     .then(res => {
    //       console.log(res);
    //       setActiveGroup(res.group);
    //       setGroupCount(activeGroup.length);
    //     })
    //     .catch(e => {
    //       console.log('Error: ', e);
    //     });
    // }
  }, []);

  // called when there are no active group
  const renderEmptyGroup = () => (
    // TODO: figure out what to put here
    <View>
      <Text style={SocialScreenStyles.emptyAvailableUsersText}>
        No active group
      </Text>
    </View>
  );

  const handleNavigateToFindFriends = () => {
    navigation.navigate(SocialRoute.FRIEND_SEARCH);
  };

  const handleNavigateToNotifications = () => {
    navigation.navigate(SocialRoute.NOTIFICATIONS);
  };

  return (
    <View testID={TabRoute.SOCIAL_STACK} style={SocialScreenStyles.container}>
      <SafeAreaView style={SocialScreenStyles.safeview}>
        <View style={SocialScreenStyles.topRow}>
          <Pressable onPress={handleNavigateToNotifications}>
            <NotificationSvg style={SocialScreenStyles.notifButton} />
          </Pressable>
          <Text style={SocialScreenStyles.title}>Social</Text>
          <Pressable onPress={handleNavigateToFindFriends}>
            <AddFriendsSvg style={SocialScreenStyles.addFriendsButton} />
          </Pressable>
        </View>

        <ScrollView>
          <View style={SocialScreenStyles.rowView}>
            <Text style={SocialScreenStyles.activeGroupText}>Active Group</Text>
            <View style={SocialScreenStyles.greenCircle}>
              <Text style={SocialScreenStyles.numberText}>{groupCount}</Text>
            </View>
          </View>
          <View style={SocialScreenStyles.activeBox}>
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
            <View style={SocialScreenStyles.glow} />
          </View>
          <View style={SocialScreenStyles.rowView}>
            <Text style={SocialScreenStyles.allFriendsText}>All Friends</Text>
            <View style={SocialScreenStyles.grayCircle}>
              <Text style={SocialScreenStyles.numberText}>{friendCount}</Text>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SocialScreen;
