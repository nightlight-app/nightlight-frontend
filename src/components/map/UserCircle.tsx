import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import UserCircleStyles from '@nightlight/components/map/UserCircle.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { UserCircleProps } from '@nightlight/src/types';
import { customFetch } from '@nightlight/src/api';
import { getStatusColor } from '@nightlight/src/utils/utils';

const UserCircle = ({ userId }: UserCircleProps) => {
  // stores the cloudinary url of the user's profile picture
  const [userImgUrlProfile, setUserImgUrlProfile] = useState<string>('');

  // stores the user's last active status and conditionally render the borderColor
  const [userStatus, setUserStatus] = useState<string>(COLORS.GRAY);

  // TODO: the user's current emoji status
  const [userEmojiStatus, setUserEmojiStatus] = useState<string>('');

  // stores the user's initials
  const [userInitials, setUserInitials] = useState<string>('');

  // query the user's image and last active time on first mount
  useEffect(() => {
    customFetch({
      resourceUrl: `/users?userIds=${userId}`,
      options: {
        method: 'GET',
      },
    })
      .then(data => {
        const { imgUrlProfileLarge, lastActive, firstName, lastName } =
          data.users[0];
        const time = lastActive?.time;
        const statusColor = time ? getStatusColor(time) : COLORS.GRAY;
        const initials = `${firstName[0]}${lastName[0]}`;

        setUserImgUrlProfile(imgUrlProfileLarge);
        setUserStatus(statusColor);
        setUserInitials(initials);
      })
      .catch(e => {
        console.error('[UserCircle] Error fetching user with ID', userId);
        throw e;
      });
  }, []);

  return (
    <View style={UserCircleStyles.container}>
      {userImgUrlProfile ? (
        <Image
          source={{
            uri: userImgUrlProfile,
          }}
          style={[
            UserCircleStyles.image,
            {
              borderColor: userStatus,
            },
          ]}
        />
      ) : (
        <View
          style={[
            UserCircleStyles.image,
            {
              borderColor: userStatus,
            },
          ]}>
          <Text style={UserCircleStyles.initials}>{userInitials}</Text>
        </View>
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
