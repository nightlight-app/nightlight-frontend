import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import { SocialRoute, SocialStackParamList } from '@nightlight/src/types';

const UserProfileScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<SocialStackParamList, SocialRoute.USER_PROFILE>) => {
  const user = route.params.user;
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

export default UserProfileScreen;
