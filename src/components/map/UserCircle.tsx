import { SERVER_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import UserCircleStyles from '@nightlight/components/map/UserCircle.styles';
import { COLORS } from '@nightlight/src/global.styles';

const UserCircle = ({ uri: userId }: { uri: string }) => {
  // stores the cloudinary url of the user's profile picture
  const [userImgUrlProfile, setUserImgUrlProfile] = useState<string>('');

  // TODO: stores the user's last active status and conditionally render the borderColor
  const [userStatus, setUserStatus] = useState<string>('');

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
    <Image
      source={{
        uri: userImgUrlProfile,
      }}
      style={[
        UserCircleStyles.userCircleImage,
        {
          // TODO: conditionally render the borderColor based on userStatus
          borderColor: COLORS.GREEN,
        },
      ]}
    />
  );
};

export default UserCircle;
