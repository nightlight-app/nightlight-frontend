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

  // const handlePress = () => {
  //   setAdded(prev => !prev);
  //   setStatusText(added ? 'ADD' : 'REQUESTED');

  //   // send request to backend to request friend
  //   if (!added) {
  //     customFetch({
  //       resourceUrl: `/users/${userDocument?._id}/request-friend/?friendId=${friendId}`,
  //       options: {
  //         method: 'PATCH',
  //       },
  //     })
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(e => {
  //         console.error('Error: ', e.response.message);
  //       });
  //   } else {
  //     // send request to backend to remove friend
  //     customFetch({
  //       resourceUrl: `/users/${userDocument?._id}/remove-friend/?friendId=${friendId}`,
  //       options: {
  //         method: 'PATCH',
  //       },
  //     })
  //       .then(response => {
  //         console.log(response);
  //       })
  //       .catch(e => {
  //         console.error('Error: ', e.response.message);
  //       });
  //   }
  // };

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
