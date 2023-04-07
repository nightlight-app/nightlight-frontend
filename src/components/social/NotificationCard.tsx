import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { NotificationCardProps } from '@nightlight/src/types';
import NotificationCardStyles from './NotificationCard.styles';
import axios from 'axios';
import { SERVER_URL } from '@env';

const NotificationCard = ({
  index,
  message,
  userId,
}: NotificationCardProps) => {
  const isEvenIndex = index % 2 !== 0;
  const [userImage, setUserImage] = useState();

  //TODO pull notifications from backend

  //TODO change from hard coded time
  const time = '1 hr ago';

  // get user image from backend
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users/?userId=${userId}/`)
      .then(res => {
        console.log(res.data);
        setUserImage(res.data.imgUrlProfileSmall);
      })
      .catch(e => {
        console.log('Error: ', e);
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
