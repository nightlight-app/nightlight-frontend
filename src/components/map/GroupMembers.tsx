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
  const [invitedGroupMembers, setInvitedGroupMembers] = useState<string[]>([]);

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
        setInvitedGroupMembers(data.group.invitedMembers);
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
            style={[
              GroupMembersStyles.memberContainer,
              {
                zIndex: groupMembers.length - index - 2,
              },
            ]}>
            <UserCircle userId={member} />
          </View>
        ))}

        {/* Invited group members */}
        {invitedGroupMembers.map((member, index) => (
          <View
            key={index}
            style={[
              GroupMembersStyles.memberContainer,
              {
                zIndex:
                  invitedGroupMembers.length - groupMembers.length - index - 1,
              },
            ]}>
            <UserCircle userId={member} />
            <View style={GroupMembersStyles.invitedGroupMemberOverlay} />
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
