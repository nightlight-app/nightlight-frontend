import FriendCard from '@nightlight/components/social/FriendCard';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import AddFriendsSvg from '@nightlight/components/svgs/AddFriendsSvg';
import NotificationSvg from '@nightlight/components/svgs/NotificationSvg';
import { Route } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView} from 'react-native';
import SocialScreenStyles from './SocialScreen.styles';
import { TEST_USERS } from '@nightlight/src/testData';
import { Circle } from 'react-native-svg';
//TODO change from using dummy data
const activeGroup = [
  {
    name: TEST_USERS[1].firstName + ' ' + TEST_USERS[1].lastName[0] + '.',
  },
  {
    name: TEST_USERS[2].firstName + ' ' + TEST_USERS[2].lastName[0] + '.',
  },
  {
    name: TEST_USERS[3].firstName + ' ' + TEST_USERS[3].lastName[0] + '.',
  },
  {
    name: TEST_USERS[4].firstName + ' ' + TEST_USERS[4].lastName[0] + '.',
  },
];

const friends = [
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
  {
    name: TEST_USERS[0].firstName + ' ' + TEST_USERS[0].lastName[0] + '.',
  },
];



const SocialScreen = () => {

    // number of members in active group
    const [groupCount, setGroupCount] = useState(0)

    // number of friends
    const [friendCount, setFriendCount] = useState(0)

    useEffect(()=> {
        setGroupCount(activeGroup.length)
        setFriendCount(friends.length)
    })

  return (
    <View testID={Route.SOCIAL} style={SocialScreenStyles.container}>
      <SafeAreaView style={SocialScreenStyles.view}>
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
            <View>
              {activeGroup.map((item: { name: string }, index) => (
                <FriendCard
                  key={index}
                  index={index}
                  name={item.name}
                  inGroup
                />
              ))}
            </View>
            {/* TODO add glow  */}
            <View style={SocialScreenStyles.glow} />
          </View>
          <Text style={SocialScreenStyles.allFriendsText}>All Friends</Text>
          <View style={SocialScreenStyles.friendBox}>
            {friends.map((item: { name: string }, index) => (
              <FriendCard
                key={index}
                index={index}
                name={item.name}
                inGroup={false}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SocialScreen;
