import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  ListRenderItemInfo,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { ManageGroupCardProps, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import ManageGroupCardStyles from '@nightlight/components/map/ManageGroupCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import { checkUserPendingInvitation } from '@nightlight/src/utils/utils';

const ManageGroupCard = ({
  onGroupMemberPress,
  onClose,
  onError,
}: ManageGroupCardProps) => {
  const { userSession, userDocument, updateUserDocument } = useAuthContext();
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [displayedAvailableUsers, setDisplayedAvailableUsers] = useState<
    User[]
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!userSession) return;
    // fetch the list of available users based on the current user's friends
    customFetch({
      resourceUrl: `/users/${userDocument?._id}/friends`,
      options: {
        method: 'GET',
      },
    })
      .then(data => {
        setAvailableUsers(data.friends);
        // filter to only include friends in the same group as the current user initially
        setSelectedUsers(
          (data.friends as User[])
            // filter to only include friends in the same group as the current user initially
            // TODO: extract filter function
            .filter(
              friend =>
                friend.currentGroup === userDocument?.currentGroup ||
                friend.invitedGroups?.includes(userDocument?.currentGroup || '')
            )
            // sort the list so already-in-group users are at the top
            // TODO: extract sort function
            .sort(friend =>
              friend.currentGroup === userDocument?.currentGroup ? -1 : 1
            )
        );
      })
      .catch(e => {
        if (onError) onError();
        console.error(e);
      });
  }, []);

  // If availableUsers changes, update displayedAvailableUsers
  useEffect(() => {
    const currentGroup = userDocument?.currentGroup || '';

    if (!currentGroup) return;

    // sort the list so already-in-group users are at the top
    setDisplayedAvailableUsers(
      // TODO: extract sort function
      availableUsers.sort((a, b) => {
        if (
          a.currentGroup === currentGroup &&
          b.currentGroup !== currentGroup
        ) {
          return -1; // a comes before b if a's group matches and b's does not
        } else if (
          a.currentGroup !== currentGroup &&
          b.currentGroup === currentGroup
        ) {
          return 1; // b comes before a if b's group matches and a's does not
        } else {
          // if the groups are the same, compare by invitedGroups
          const isUserAInvitedToGroup = checkUserPendingInvitation(
            a,
            currentGroup
          );
          const isUserBInvitedToGroup = checkUserPendingInvitation(
            b,
            currentGroup
          );

          if (isUserAInvitedToGroup && !isUserBInvitedToGroup) {
            return -1; // a comes before b if a is invited to the group and b is not
          } else if (!isUserAInvitedToGroup && isUserBInvitedToGroup) {
            return 1; // b comes before a if b is invited to the group and a is not
          } else return 0; // no change if both users are invited or not invited
        }
      })
    );
  }, [availableUsers]);

  // Filters the list of available users by first name or last name based on the search text
  useEffect(() => {
    if (!searchText) setDisplayedAvailableUsers(availableUsers);
    else {
      // TODO: improve search algorithm
      const lowerCaseSearchText = searchText.toLowerCase();
      setDisplayedAvailableUsers(
        availableUsers.filter(
          user =>
            user.firstName.toLowerCase().includes(lowerCaseSearchText) ||
            user.lastName.toLowerCase().includes(lowerCaseSearchText)
        )
      );
    }
  }, [searchText]);

  // Adds a user to the list of selected users
  const selectUser = (user: User) => {
    if (!selectedUsers.includes(user))
      setSelectedUsers(prev => [...prev, user]);
    else deselectUser(user);
  };

  // Removes a user from the list of selected users
  const deselectUser = (user: User) => {
    setSelectedUsers(prev =>
      prev.filter(selectedUser => selectedUser !== user)
    );
  };

  // Navigates to the add friends screen
  const handleAddFriendsPress = () => {
    Alert.alert('TODO: navigate to add friends screen');
  };

  // handle leaving the current group
  const handleLeaveGroup = () => {
    if (!userDocument || !userSession) {
      if (onError) onError();
      return;
    }

    // send a PATCH request to the server to leave the group
    customFetch({
      resourceUrl: `/users/${userDocument?._id}/leave-group?groupId=${userDocument.currentGroup}`,
      options: {
        method: 'PATCH',
      },
    })
      .then(data => {
        // update the user document
        updateUserDocument(userSession);
        // alert the user that they have left the group
        Alert.alert('You have left the group!');
        // close the card
        onClose();
      })
      .catch(e => {
        if (onError) onError();
        console.error(e);
      });
  };

  // invite the selected users to the current group
  const handleInviteToGroup = () => {
    if (!userDocument || !userSession) {
      if (onError) onError();
      return;
    }

    // filter out users that are already in the group and users that are already invited
    const usersToInvite = selectedUsers.filter((user: User) => {
      return (
        user.currentGroup !== userDocument?.currentGroup &&
        !checkUserPendingInvitation(user, userDocument?.currentGroup || '')
      );
    });

    if (usersToInvite.length === 0) return Alert.alert('No users selected!');

    const invitedMembers = usersToInvite.map(user => user._id);

    // send a PATCH request to the server to invite the selected users to the group
    customFetch({
      resourceUrl: `/groups/${userDocument?.currentGroup}/invite-members?userId=${userDocument?._id}`,
      options: {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: invitedMembers }),
      },
    })
      .then(data => {
        // update the user document
        updateUserDocument(userSession);
        // display success and close card
        Alert.alert(data.message);
        onClose();
      })
      .catch(e => {
        if (onError) onError();
        console.error(e);
      });
  };

  // function to render the list of selected friends
  const renderSelectedUser = ({ item }: ListRenderItemInfo<User>) => {
    const userIsInGroup = item.currentGroup === userDocument?.currentGroup;
    const userIsInvitedToGroup = item.invitedGroups?.includes(
      userDocument?.currentGroup || ''
    );

    return (
      <View style={ManageGroupCardStyles.selectedUserContainer}>
        <Image
          style={ManageGroupCardStyles.selectedUserImg}
          source={{ uri: item.imgUrlProfileSmall }}
        />
        {/* Only render close button if the user isn't already in the group */}
        {!userIsInGroup && !userIsInvitedToGroup && (
          <CloseButton
            onPress={() => deselectUser(item)}
            size={8}
            style={ManageGroupCardStyles.removeUserButton}
          />
        )}
        {/* Overlay pending */}
        {userIsInvitedToGroup && (
          <View style={ManageGroupCardStyles.invitedUserOverlay}>
            <MaterialIcons name='schedule' size={24} color={COLORS.GRAY} />
          </View>
        )}
      </View>
    );
  };

  // function to render the list of available friends
  const renderAvailableUser = ({ item, index }: ListRenderItemInfo<User>) => {
    const userIsInGroup = item.currentGroup === userDocument?.currentGroup;
    const userIsInvitedToGroup = item.invitedGroups?.includes(
      userDocument?.currentGroup || ''
    );
    const isFirstItem = index === 0;
    const isLastItem = index === availableUsers.length - 1;
    const isSelected = selectedUsers.includes(item) || userIsInGroup;

    const handleGroupMemberPress = () => {
      if (userIsInGroup || userIsInvitedToGroup) {
        onGroupMemberPress(item._id);
      } else {
        selectUser(item);
      }
    };

    return (
      <TouchableOpacity
        onPress={handleGroupMemberPress}
        style={[
          ManageGroupCardStyles.availableUserContainer,
          isFirstItem && ManageGroupCardStyles.availableUserTopItem,
          isLastItem && ManageGroupCardStyles.availableUserBottomItem,
        ]}
        activeOpacity={0.75}>
        <Image
          style={ManageGroupCardStyles.availableUserImg}
          source={{ uri: item.imgUrlProfileSmall }}
        />
        <Text style={ManageGroupCardStyles.availableUserName}>
          {item.firstName} {item.lastName}
        </Text>
        {!userIsInGroup && !userIsInvitedToGroup && (
          <View style={ManageGroupCardStyles.selectCheckboxContainer}>
            {isSelected ? (
              <Ionicons
                name='ios-checkmark-circle'
                size={20}
                color={COLORS.GREEN}
              />
            ) : (
              <View style={ManageGroupCardStyles.selectCheckboxOutline} />
            )}
          </View>
        )}
        {userIsInvitedToGroup && (
          <View style={ManageGroupCardStyles.selectCheckboxContainer}>
            <MaterialIcons name='schedule' size={24} color={COLORS.WHITE} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // item separator for the list of available friends
  const renderAvailableUserSeparator = () => (
    <View style={ManageGroupCardStyles.availableUsersListSeparator} />
  );

  // function to render the list of available friends
  const renderEmptyAvailableUsers = () => (
    <View style={ManageGroupCardStyles.emptyAvailableUsersContainer}>
      <Text style={ManageGroupCardStyles.emptyAvailableUsersText}>
        Well, what are you waiting for? Go make some friends!
      </Text>
      <TouchableOpacity
        onPress={handleAddFriendsPress}
        style={ManageGroupCardStyles.addFriendsButton}
        activeOpacity={0.75}>
        <Text style={ManageGroupCardStyles.addFriendsButtonText}>
          + Add Friends
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MapCard
      borderColor={COLORS.NIGHTLIGHT_BLUE}
      onClose={onClose}
      // TODO: left button will be for saved groups
      buttonLeft={{
        backgroundColor: COLORS.RED,
        borderColor: COLORS.DARK_RED,
        iconComponent: null,
        text: 'Leave',
        onPress: handleLeaveGroup,
      }}
      buttonRight={{
        backgroundColor: COLORS.GREEN,
        borderColor: COLORS.DARK_GREEN,
        iconComponent: null,
        text: 'Invite',
        onPress: handleInviteToGroup,
      }}>
      <Text style={ManageGroupCardStyles.title}>Manage Group</Text>

      {/* Select friends */}
      <View>
        <Text style={ManageGroupCardStyles.selectedUsersText}>
          Group Members ({selectedUsers.length})
        </Text>
        <FlatList
          style={ManageGroupCardStyles.selectedUsersList}
          horizontal
          data={selectedUsers}
          renderItem={renderSelectedUser}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={selectedUsers.length > 0}
          indicatorStyle='white'
        />
      </View>

      {/* TODO: handle keyboard view stuff */}
      <TextInput
        style={ManageGroupCardStyles.searchInput}
        placeholder='Search friends...'
        placeholderTextColor={COLORS.GRAY}
        onChangeText={setSearchText}
        value={searchText}
        keyboardAppearance='dark'
      />

      {/* Available friends */}
      <FlatList
        style={ManageGroupCardStyles.availableUsersList}
        data={displayedAvailableUsers}
        renderItem={renderAvailableUser}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderAvailableUserSeparator}
        ListEmptyComponent={renderEmptyAvailableUsers}
        scrollEnabled={availableUsers.length > 0}
        indicatorStyle='white'
      />
    </MapCard>
  );
};

export default ManageGroupCard;
