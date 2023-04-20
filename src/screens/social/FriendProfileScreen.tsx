import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { TEST_USERS } from '@nightlight/src/testData';
import { User } from '@nightlight/src/types';

const FriendProfileScreen = (props: { route: { params: { item: User } } }) => {
  const user = props.route.params.item;
  console.log(user.imgUrlProfileSmall);

  // set proper image
  const image = user.imgUrlProfileSmall
    ? { uri: user.imgUrlProfileSmall }
    : require('@nightlight/assets/images/anon.png');

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
      <Image source={image} style={ProfileScreenStyles.profilePic} />

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
