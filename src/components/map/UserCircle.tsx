import { SERVER_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import UserCircleStyles from '@nightlight/components/map/UserCircle.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { UserCircleProps } from '@nightlight/src/types';

const UserCircle = ({ uri: userId }: UserCircleProps) => {
  // stores the cloudinary url of the user's profile picture
  const [userImgUrlProfile, setUserImgUrlProfile] = useState<string>('');

  // TODO: stores the user's last active status and conditionally render the borderColor
  const [userStatus, setUserStatus] = useState<string>('');

  // TODO: the user's current emoji status
  const [userEmojiStatus, setUserEmojiStatus] = useState<string>('');

  // query the user's image on first mount
  useEffect(() => {
    fetch(`${SERVER_URL}users?userId=${userId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setUserImgUrlProfile(data.user.imgUrlProfileLarge);
      });
  }, []);

  return (
    <View>
      {userImgUrlProfile && (
        <Image
          source={{
            uri: userImgUrlProfile,
          }}
          style={[
            UserCircleStyles.image,
            {
              // TODO: conditionally render the borderColor based on userStatus
              borderColor: COLORS.GREEN,
            },
          ]}
        />
      )}
      {userEmojiStatus && (
        <View style={UserCircleStyles.emoji}>
          <Text>{userEmojiStatus}</Text>
        </View>
      )}
    </View>
  );
};

export default UserCircle;
