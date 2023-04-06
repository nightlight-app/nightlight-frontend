import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps, NotificationCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';
import NotificationCardStyles from './NotificationCard.styles';
import FriendCard from './FriendCard';
import axios from 'axios';
import { SERVER_URL } from '@env';

const NotificationCard = ({ index, message, userId }: NotificationCardProps) => {
  let isEvenIndex = index % 2 !== 0;
  let [userImage, setUserImage] = useState('@nightlight/assets/images/anon.png');
  
 //TODO pull notifications from backend

  //TODO change from hard coded time
    let time = "1 hr ago"

  // get user image from backend
    useEffect(() => {
        axios
        .get(`${SERVER_URL}/users/?userId=${userId}/`)
        .then(res => {
          console.log(res.data)
          setUserImage(res.data.imgUrlProfileSmall)
        })
        .catch(e => {
          console.log('Error: ', e);
        });
    },[]);

    // check if notification is a friend request or group invite


  return (
    <View
      style={[
        NotificationCardStyles.container,
        isEvenIndex && NotificationCardStyles.containerAlt,
      ]}>
      <View style={NotificationCardStyles.leftSide}>
        <Image
          source={userImage==='@nightlight/assets/images/anon.png'?require('@nightlight/assets/images/anon.png'): {uri: `${userImage}`}}
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
