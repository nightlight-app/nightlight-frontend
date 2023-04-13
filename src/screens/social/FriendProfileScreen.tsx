import React from 'react';
import { View, Image, Text } from 'react-native';
import ProfileScreenStyles from '../profile/ProfileScreen.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { TEST_USERS } from '@nightlight/src/testData';
import { User } from '@nightlight/src/types';

const FriendProfileScreen = () => {
  const { userDocument } = useAuthContext();

  // TODO: change TEST_USER[0] to a fallback user with defualt data
  const user: User = userDocument
    ? {
        ...userDocument,
        // parse the birthday into Date object
        birthday: new Date(userDocument.birthday),
      }
    : TEST_USERS[0];
  return (
    <View style={ProfileScreenStyles.scrollViewContainer}>
      {/* Cover Picture */}
      <View style={ProfileScreenStyles.coverPicContainer}>
        <Image
          style={ProfileScreenStyles.coverPic}
          // TODO: make this dynamic
          source={require('@nightlight/assets/images/cover-photo.png')}
        />
      </View>

      {/* Profile Picture */}
      {/* TODO: add press action?? (expand or edit?) */}
      <Image
        source={{ uri: user.imgUrlProfileSmall }}
        style={ProfileScreenStyles.profilePic}
      />

      {/* Profile Details */}
      <View style={ProfileScreenStyles.profileDetailsContainer}>
        {/* User Info */}
        <Text style={ProfileScreenStyles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
    </View>
  );
};

export default FriendProfileScreen;
