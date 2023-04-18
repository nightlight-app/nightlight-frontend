import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Pressable, View, Text } from 'react-native';
import { Foundation, MaterialIcons } from '@expo/vector-icons';
import GroupMembersStyles from '@nightlight/components/map/GroupMembers.styles';
import UserCircle from '@nightlight/components/map/UserCircle';
import { COLORS } from '@nightlight/src/global.styles';
import { ButtonProps, DisplayedGroupMember, User } from '@nightlight/src/types';
import { customFetch } from '@nightlight/src/api';
import { DISPLAYED_GROUP_MEMBERS_LIMIT } from '@nightlight/src/constants';

const GroupMembers = ({ onPress }: ButtonProps) => {
  // get the current user's document
  const { userDocument } = useAuthContext();
  const { _id: currentUserId, currentGroup: currentUserGroup } =
    userDocument as User;

  // keep track of the current group's members _ids
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [invitedGroupMembers, setInvitedGroupMembers] = useState<string[]>([]);

  // keep track of the displayed group members _ids and whether they are invited
  const [displayedGroupMembers, setDisplayedGroupMembers] = useState<
    DisplayedGroupMember[]
  >([]);

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
  }, [userDocument]);

  // update the displayed group members when the group members or invited group members change
  useEffect(() => {
    const allOtherMembers: DisplayedGroupMember[] = [
      ...groupMembers.map(userId => ({ userId, isInvited: false })),
      ...invitedGroupMembers.map(userId => ({ userId, isInvited: true })),
    ];

    setDisplayedGroupMembers(
      allOtherMembers.slice(0, DISPLAYED_GROUP_MEMBERS_LIMIT - 1)
    );
  }, [groupMembers, invitedGroupMembers]);

  return (
    <SafeAreaView style={GroupMembersStyles.container}>
      <Pressable style={GroupMembersStyles.groupMembersList} onPress={onPress}>
        {/* Render self first */}
        <UserCircle userId={currentUserId} />

        {/* Other group members */}
        {displayedGroupMembers.map(({ userId, isInvited }, index) => (
          <View
            key={index}
            style={[
              GroupMembersStyles.memberContainer,
              {
                zIndex: groupMembers.length - index - 2,
              },
            ]}>
            <UserCircle userId={userId} />
            {isInvited && (
              <View style={GroupMembersStyles.invitedGroupMemberOverlay}>
                <MaterialIcons name='schedule' size={24} color={COLORS.GRAY} />
              </View>
            )}
          </View>
        ))}

        {/* Additional group members count */}
        {groupMembers.length + invitedGroupMembers.length >
          DISPLAYED_GROUP_MEMBERS_LIMIT - 1 && (
          <View style={GroupMembersStyles.additionalMembersCountContainer}>
            <Text style={GroupMembersStyles.additionalMembersCount}>
              +
              {groupMembers.length +
                invitedGroupMembers.length +
                1 -
                DISPLAYED_GROUP_MEMBERS_LIMIT}
            </Text>
          </View>
        )}

        {/* Add button */}
        <View style={GroupMembersStyles.addButton}>
          <Foundation name='plus' size={15} color={COLORS.WHITE} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default GroupMembers;
