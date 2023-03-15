import { SERVER_URL } from '@env';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import GroupMembersStyles from '@nightlight/components/map/GroupMembers.styles';
import UserCircle from '@nightlight/components/map/UserCircle';
import { Foundation } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { User } from '@nightlight/src/types';

const GroupMembers = ({
  userOnPress,
  addGroupOnPress,
}: {
  /**
   * Function to call when a user circle is pressed.
   * @param userToShow User to show when circle is pressed.
   */
  userOnPress: (userToShow?: User) => void;
  /**
   * Function to call when the add button is pressed.
   */
  addGroupOnPress: () => void;
}) => {
  // get the current user's document
  const { userDocument } = useAuthContext();

  // keep track of the current group's members _ids
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  // fetch the current group's members when the current group changes
  useEffect(() => {
    if (userDocument?.currentGroup) {
      fetch(`${SERVER_URL}groups?groupId=${userDocument.currentGroup}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          // filter out the current user's _id from the group members
          const filteredMembers = data.group.members.filter(
            (member: string) => member !== userDocument._id
          );
          setGroupMembers(filteredMembers);
        });
    }
  }, [userDocument?.currentGroup]);

  /**
   * Handles user circle press by querying the user's data and passing it to
   * the userOnPress function which renders the UserCard component
   */
  const handleUserOnClick = (userId: string) => {
    fetch(`${SERVER_URL}users?userId=${userId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        // TODO: mongoose returns the date as string, so need to convert to Date object
        // think of a better way to do this (maybe a util function that parses User?)
        const user = data.user as User;
        user.lastActive.time = new Date(user.lastActive.time);
        userOnPress(user);
      });
  };

  return (
    <SafeAreaView style={{ position: 'absolute' }}>
      <View style={GroupMembersStyles.container}>
        {/* Display the list of user circles */}
        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'normal'}
          style={GroupMembersStyles.userList}>
          {groupMembers.map((member, index) => (
            <Pressable
              key={index}
              style={[
                GroupMembersStyles.userCircleTouchable,
                {
                  zIndex: groupMembers.length - index,
                  left: -index * 10,
                },
              ]}
              onPress={() => handleUserOnClick(member)}>
              <UserCircle uri={member} />
            </Pressable>
          ))}
        </Animated.ScrollView>

        {/* Display a button to add member */}
        <Pressable
          onPress={addGroupOnPress}
          style={GroupMembersStyles.addMember}>
          <Foundation name='plus' size={15} color={COLORS.WHITE} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default GroupMembers;
