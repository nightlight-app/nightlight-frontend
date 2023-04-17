import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Pressable, View } from 'react-native';
import GroupMembersStyles from '@nightlight/components/map/GroupMembers.styles';
import UserCircle from '@nightlight/components/map/UserCircle';
import { Foundation } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { User } from '@nightlight/src/types';
import { customFetch } from '@nightlight/src/api';

const GroupMembers = () => {
  // get the current user's document
  const { userDocument } = useAuthContext();
  const { _id: currentUserId, currentGroup: currentUserGroup } =
    userDocument as User;

  // keep track of the current group's members _ids
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [pendingGroupMembers, setPendingGroupMembers] = useState<string[]>([]);

  // FIXME: this does not work as expected because currentUserGroup is not updated
  // fetch the current group's members when the current group changes
  useEffect(() => {
    if (currentUserGroup) {
      customFetch({
        resourceUrl: `/groups?groupId=${currentUserGroup}`,
        options: {
          method: 'GET',
        },
      }).then(data => {
        // filter out the current user's _id from the group members
        const filteredMembers = data.group.members.filter(
          (member: string) => member !== currentUserId
        );
        setGroupMembers(filteredMembers);
        setPendingGroupMembers(data.group.invitedMembers);
      });
    }
  }, []);

  const handleGroupPress = () => {
    alert('Group Pressed!');
  };

  return (
    <SafeAreaView style={GroupMembersStyles.container}>
      <Pressable
        style={GroupMembersStyles.groupMembersList}
        onPress={handleGroupPress}>
        {/* Render self first */}
        <UserCircle userId={currentUserId} />

        {/* Other group members */}
        {groupMembers.map((member, index) => (
          <View
            key={index}
            style={{
              zIndex: groupMembers.length - index - 2,
              marginLeft: -(index + 1) * 10,
            }}>
            <UserCircle userId={member} />
          </View>
        ))}

        {/* Pending group members */}
        {pendingGroupMembers.map((member, index) => (
          <View
            key={index}
            style={{
              zIndex:
                pendingGroupMembers.length - groupMembers.length - index - 3,
              marginLeft: -(index + 1) * 10,
              opacity: 0.3,
            }}>
            <UserCircle userId={member} />
          </View>
        ))}

        {/* Add button */}
        <View style={GroupMembersStyles.addButton}>
          <Foundation name='plus' size={15} color={COLORS.WHITE} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default GroupMembers;
