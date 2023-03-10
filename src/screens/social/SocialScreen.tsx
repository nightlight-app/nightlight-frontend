import FriendCard from '@nightlight/components/social/FriendCard';
import AddFriendsSvg from '@nightlight/components/svgs/AddFriendsSvg';
import NotificationSvg from '@nightlight/components/svgs/NotificationSvg';
import { TabRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import SocialScreenStyles from '@nightlight/screens/social/SocialScreen.styles';
import { activeGroup, friends } from '@nightlight/src/testData';

const SocialScreen = () => {
  // number of members in active group
  const [groupCount, setGroupCount] = useState(0);

  // number of friends
  const [friendCount, setFriendCount] = useState(0);

  useEffect(() => {
    setGroupCount(activeGroup.length);
    setFriendCount(friends.length);
  });

  // called when there are no active group
  const renderEmptyGroup = () => (
    // TODO: figure out what to put here
    <View>
      <Text style={SocialScreenStyles.emptyAvailableUsersText}>
        No active group
      </Text>
    </View>
  );

  return (
    <View testID={TabRoute.SOCIAL} style={SocialScreenStyles.container}>
      <SafeAreaView style={SocialScreenStyles.safeview}>
        <View style={SocialScreenStyles.topRow}>
          <NotificationSvg style={SocialScreenStyles.notifButton} />
          <Text style={SocialScreenStyles.title}>Social</Text>
          <AddFriendsSvg style={SocialScreenStyles.addFriendsButton} />
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
            {friends.map((item: { name: string }, index) => (
              <FriendCard
                key={index}
                index={index}
                name={item.name}
                isInGroup={false}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SocialScreen;
