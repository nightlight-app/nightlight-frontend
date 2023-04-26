import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  SearchUserCardProps,
  SocialRoute,
  SocialStackParamList,
  User,
  FriendStatus,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import UserCardStyles from '@nightlight/components/social/SearchUserCard.styles';
import { customFetch } from '@nightlight/src/api';

const SearchUserCard = ({
  isFirstItem,
  isLastItem,
  user,
}: SearchUserCardProps) => {
  const { userDocument } = useAuthContext();

  const navigation = useNavigation<NavigationProp<SocialStackParamList>>();

  const imgUrl: string | undefined = user.imgUrlProfileSmall;

  const [friendStatus, setFriendStatus] = useState<FriendStatus>(
    userDocument && userDocument.friends.includes(user._id)
      ? FriendStatus.FRIEND
      : userDocument && userDocument.sentFriendRequests?.includes(user._id)
      ? FriendStatus.REQUESTED
      : FriendStatus.ADD
  );

  const handleUserPress = (user: User) => {
    navigation.navigate(SocialRoute.USER_PROFILE, { user });
  };

  const handleAddFriend = async () => {
    setFriendStatus(FriendStatus.REQUESTED);

    try {
      await customFetch({
        resourceUrl: `/users/${userDocument?._id}/request-friend?friendId=${user._id}`,
        options: {
          method: 'PATCH',
        },
      });
    } catch (error) {
      console.error(
        '[SeachUserCard] An error occurred while adding friend:\n',
        error
      );
      setFriendStatus(FriendStatus.ADD);
    }
  };

  const handleRemoveFriend = async () => {
    setFriendStatus(FriendStatus.ADD);

    try {
      await customFetch({
        resourceUrl: `/users/${userDocument?._id}/remove-friend?friendId=${user._id}`,
        options: {
          method: 'PATCH',
        },
      });
    } catch (error) {
      console.error(
        '[SeachUserCard] An error occurred while removing friend:\n',
        error
      );
      setFriendStatus(FriendStatus.FRIEND);
    }
  };

  const handleCancelFriendRequest = async () => {
    setFriendStatus(FriendStatus.ADD);

    try {
      await customFetch({
        resourceUrl: `/users/${userDocument?._id}/remove-friend-request?friendId=${user._id}`,
        options: {
          method: 'PATCH',
        },
      });
    } catch (error) {
      console.error(
        '[SeachUserCard] An error occurred while cancelling friend request:\n',
        error
      );
      setFriendStatus(FriendStatus.REQUESTED);
    }
  };

  const handleFriendButtonPress = () => {
    switch (friendStatus) {
      case FriendStatus.ADD:
        handleAddFriend();
        break;
      case FriendStatus.REQUESTED:
        handleCancelFriendRequest();
        break;
      case FriendStatus.FRIEND:
        handleRemoveFriend();
        break;
      default:
        console.warn('[SearchUserCard] Invalid friend status:', friendStatus);
        return;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleUserPress(user)}
      style={[
        UserCardStyles.itemContainer,
        isFirstItem && UserCardStyles.topItem,
        isLastItem && UserCardStyles.bottomItem,
      ]}
      activeOpacity={0.75}>
      <View style={UserCardStyles.userInfoContainer}>
        {imgUrl ? (
          <Image source={{ uri: imgUrl }} style={UserCardStyles.profileImage} />
        ) : (
          <View style={UserCardStyles.profileImage}>
            <Text style={UserCardStyles.userName}>
              {user.firstName[0] + user.lastName[0]}
            </Text>
          </View>
        )}
        <Text style={UserCardStyles.userName}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleFriendButtonPress}
        style={[
          UserCardStyles.friendButton,
          (friendStatus === FriendStatus.FRIEND ||
            friendStatus === FriendStatus.REQUESTED) &&
            UserCardStyles.grayedOutButton,
        ]}
        activeOpacity={0.75}>
        <Text style={UserCardStyles.statusText}>{friendStatus}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchUserCard;
