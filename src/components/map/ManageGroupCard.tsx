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
import { Ionicons } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { CreateGroupCardProps, Group, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import CreateGroupCardStyles from '@nightlight/components/map/CreateGroupCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import {
  generateGroupName,
  getDatetimeHoursAfter as getDatetimeAfterHours,
} from '@nightlight/src/utils/utils';
import { customFetch } from '@nightlight/src/api';

const ManageGroupCard = ({ onClose, onError }: CreateGroupCardProps) => {
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
      })
      .catch(e => {
        if (onError) onError();
        console.error(e);
      });
  }, []);

  // If availableUsers changes, update displayedAvailableUsers
  useEffect(() => setDisplayedAvailableUsers(availableUsers), [availableUsers]);

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

  // Creates a group with the selected users
  const handleCreateGroup = () => {
    if (!userDocument || !userSession) {
      if (onError) onError();
      return;
    }
    if (selectedUsers.length === 0) return Alert.alert('No users selected!');

    // create a group object
    const groupObject: Group = {
      name: generateGroupName([userDocument, ...selectedUsers]),
      members: [userDocument._id],
      invitedMembers: selectedUsers.map(user => user._id),
      creationDatetime: new Date(),
      expirationDatetime: getDatetimeAfterHours(8),
    };

    // send a POST request to the server to create the group
    customFetch({
      resourceUrl: `/groups?userId=${userDocument?._id}`,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupObject),
      },
    })
      .then(data => {
        // display success and close card
        Alert.alert(data.message);
        updateUserDocument(userSession);
        onClose();
      })
      .catch(e => {
        if (onError) onError();
        console.error(e);
      });
  };

  // function to render the list of selected friends
  const renderSelectedUser = ({ item }: ListRenderItemInfo<User>) => {
    return (
      <View style={CreateGroupCardStyles.selectedUserContainer}>
        <Image
          style={CreateGroupCardStyles.selectedUserImg}
          source={{ uri: item.imgUrlProfileSmall }}
        />
        <CloseButton
          onPress={() => deselectUser(item)}
          size={8}
          style={CreateGroupCardStyles.removeUserButton}
        />
      </View>
    );
  };

  // function to render the list of available friends
  const renderAvailableUser = ({ item, index }: ListRenderItemInfo<User>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === availableUsers.length - 1;
    const isSelected = selectedUsers.includes(item);

    return (
      <TouchableOpacity
        onPress={() => selectUser(item)}
        style={[
          CreateGroupCardStyles.availableUserContainer,
          isFirstItem && CreateGroupCardStyles.availableUserTopItem,
          isLastItem && CreateGroupCardStyles.availableUserBottomItem,
        ]}
        activeOpacity={0.75}>
        <Image
          style={CreateGroupCardStyles.availableUserImg}
          source={{ uri: item.imgUrlProfileSmall }}
        />
        <Text style={CreateGroupCardStyles.availableUserName}>
          {item.firstName} {item.lastName}
        </Text>
        <View style={CreateGroupCardStyles.selectCheckboxContainer}>
          {isSelected ? (
            <Ionicons
              name='ios-checkmark-circle'
              size={20}
              color={COLORS.GREEN}
            />
          ) : (
            <View style={CreateGroupCardStyles.selectCheckboxOutline} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // item separator for the list of available friends
  const renderAvailableUserSeparator = () => (
    <View style={CreateGroupCardStyles.availableUsersListSeparator} />
  );

  // function to render the list of available friends
  const renderEmptyAvailableUsers = () => (
    <View style={CreateGroupCardStyles.emptyAvailableUsersContainer}>
      <Text style={CreateGroupCardStyles.emptyAvailableUsersText}>
        Well, what are you waiting for? Go make some friends!
      </Text>
      <TouchableOpacity
        onPress={handleAddFriendsPress}
        style={CreateGroupCardStyles.addFriendsButton}
        activeOpacity={0.75}>
        <Text style={CreateGroupCardStyles.addFriendsButtonText}>
          + Add Friends
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MapCard
      borderColor={COLORS.GREEN}
      onClose={onClose}
      // TODO: left button will be for saved groups
      buttonLeft={{
        backgroundColor: COLORS.RED,
        borderColor: COLORS.DARK_RED,
        iconComponent: null,
        text: 'Cancel',
        onPress: onClose,
      }}
      buttonRight={{
        backgroundColor: COLORS.GREEN,
        borderColor: COLORS.DARK_GREEN,
        iconComponent: null,
        text: 'Create',
        onPress: handleCreateGroup,
      }}>
      <Text style={CreateGroupCardStyles.title}>New Group</Text>

      {/* Select friends */}
      <View>
        <Text style={CreateGroupCardStyles.selectedUsersText}>
          Selected Friends ({selectedUsers.length})
        </Text>
        <FlatList
          style={CreateGroupCardStyles.selectedUsersList}
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
        style={CreateGroupCardStyles.searchInput}
        placeholder='Search friends...'
        placeholderTextColor={COLORS.GRAY}
        onChangeText={setSearchText}
        value={searchText}
        keyboardAppearance='dark'
      />

      {/* Available friends */}
      <FlatList
        style={CreateGroupCardStyles.availableUsersList}
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
