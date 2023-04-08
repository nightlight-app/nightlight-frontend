import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { NotificationCardProps } from '@nightlight/src/types';
import NotificationCardStyles from './NotificationCard.styles';
import { customFetch } from '@nightlight/src/api';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

const NotificationCard = ({
  index,
  message,
  userId,
}: NotificationCardProps) => {
  const { userSession } = useAuthContext();
  const isEvenIndex = index % 2 !== 0;
  const [userImage, setUserImage] = useState();

  //TODO pull notifications from backend

  //TODO change from hard coded time
  const time = '1 hr ago';

  // get user image from backend
  useEffect(() => {
    if (!userSession) return;

    customFetch(userSession, `/users?userId=${userId}`, {
      method: 'GET',
    })
      .then(res => {
        setUserImage(res.users[0].imgUrlProfileSmall);
      })
      .catch(e => {
        console.log('[NotificationCard] Error: ', e);
      });
  }, []);

  // check if notification is a friend request or group invite

  return (
    <View
      style={[
        NotificationCardStyles.container,
        isEvenIndex && NotificationCardStyles.containerAlt,
      ]}>
      <View style={NotificationCardStyles.leftSide}>
        <Image
          source={
            userImage
              ? { uri: `${userImage}` }
              : require('@nightlight/assets/images/anon.png')
          }
          style={NotificationCardStyles.profileImage}
        />
        <View style={NotificationCardStyles.textbox}>
          <Text style={NotificationCardStyles.message}>{message}</Text>
        </View>
        <Text style={NotificationCardStyles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;
