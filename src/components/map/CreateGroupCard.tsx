import React, { useEffect, useState } from 'react';
import {
  Text,
  Pressable,
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
import { CreateGroupCardProps, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import CreateGroupCardStyles from '@nightlight/components/map/CreateGroupCard.styles';
import CloseButton from '@nightlight/components/CloseButton';
import { TEST_USERS } from '@nightlight/src/testData';

const CreateGroupCard = ({ onClose }: CreateGroupCardProps) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]); // TODO: remove test data
  const [displayedAvailableUsers, setDisplayedAvailableUsers] = useState<
    User[]
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    // TODO: fetch the list of availble users based on the current user's friends
    // setAvailableUsers([]);
  }, []);

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
    Alert.alert(
      'TODO: create a group with these users: ',
      JSON.stringify(
        selectedUsers.map(user => user.firstName + ' ' + user.lastName)
      )
    );
    // TODO: close if group creation is successful
    onClose();
  };

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

  const renderAvailableUserSeparator = () => (
    <View style={CreateGroupCardStyles.availableUsersListSeparator} />
  );

  const renderEmptyAvailableUsers = () => (
    <>
      <Text style={CreateGroupCardStyles.noAvailableUsersText}>
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
    </>
  );

  return (
    <MapCard borderColor={COLORS.GREEN} onClose={onClose}>
      <Text style={CreateGroupCardStyles.title}>New Group</Text>
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
      />
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
      <TouchableOpacity
        onPress={handleCreateGroup}
        style={CreateGroupCardStyles.createButton}
        activeOpacity={0.75}>
        <Text style={CreateGroupCardStyles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </MapCard>
  );
};

export default CreateGroupCard;
