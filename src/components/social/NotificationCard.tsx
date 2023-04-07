import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps, NotificationCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';
import NotificationCardStyles from './NotificationCard.styles';
import FriendCard from './FriendCard';
import axios from 'axios';
import { SERVER_URL } from '@env';

const NotificationCard = ({
  index,
  message,
  userId,
  type,
}: NotificationCardProps) => {
  let isEvenIndex = index % 2 !== 0;
  let [userImage, setUserImage] = useState(
    '@nightlight/assets/images/anon.png'
  );

  //TODO pull notifications from backend

  //TODO change from hard coded time
  let time = '1 hr ago';

  // get user image from backend
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users/?userId=${userId}/`)
      .then(res => {
        console.log(res.data);
        setUserImage(res.data.imgUrlProfileSmall);
      })
      .catch(e => {
        // no profile photo found
      });
  }, []);

  return (
    <View
      style={[
        NotificationCardStyles.container,
        type==='groupInvite' && NotificationCardStyles.containerAlt,
      ]}>
      <View  style={NotificationCardStyles.card}>
        <Image
          source={
            userImage === '@nightlight/assets/images/anon.png'
              ? require('@nightlight/assets/images/anon.png')
              : { uri: `${userImage}` }
          }
          style={NotificationCardStyles.profileImage}
        />
        <View style={NotificationCardStyles.textbox}>
          <Text style={NotificationCardStyles.message}>{message}</Text>
        </View>
        <Text style={NotificationCardStyles.time}>{time}</Text>
      </View>
      {type === 'groupInvite' || type==='friendRequest' ? (
        <View style={NotificationCardStyles.buttonrow}>
        <Pressable style={NotificationCardStyles.accept}>
          <Text style={NotificationCardStyles.acceptButtonText}>Accept</Text>
        </Pressable>
        <Pressable style={NotificationCardStyles.decline}>
          <Text style={NotificationCardStyles.declineButtonText}>Decline</Text>
        </Pressable>
      </View>
      ) : (
        null
      )}
    </View>
  );
};

export default NotificationCard;
