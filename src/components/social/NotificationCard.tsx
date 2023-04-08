import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps, NotificationCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';
import NotificationCardStyles from './NotificationCard.styles';
import FriendCard from './FriendCard';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

const NotificationCard = ({
  index,
  message,
  time,
  friendId,
  type,
}: NotificationCardProps) => {
  let isEvenIndex = index % 2 !== 0;
  let [userImage, setUserImage] = useState(
    '@nightlight/assets/images/anon.png'
  );
  let [formattedTime, setFormattedTime] = useState('');

  // user id
  const { userDocument } = useAuthContext();
  let userId = userDocument?._id;
    
  // get user image from backend
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users/?userId=${friendId}/`)
      .then(res => {
        console.log(res.data);
        setUserImage(res.data.imgUrlProfileSmall);
      })
      .catch(e => {
        // no profile photo found
      });

    // format time
    const timeThen = new Date(time);
    let timeNow = new Date();
    let timeDiff = timeNow.getTime() - timeThen.getTime();
    let timeDiffInHours = timeDiff / (1000 * 3600);
    let timeDiffInDays = timeDiffInHours / 24;
    let timeDiffInWeeks = timeDiffInDays / 7;
    let timeDiffInMonths = timeDiffInDays / 30;
    let timeDiffInYears = timeDiffInDays / 365;
    if (timeDiffInHours < 1) {
      setFormattedTime(`${Math.floor(timeDiff / 60000)} min`);
    } else if (timeDiffInDays < 1) {
      setFormattedTime(`${Math.floor(timeDiffInHours)} hr`);
    } else if (timeDiffInWeeks < 1) {
      setFormattedTime(`${Math.floor(timeDiffInDays)} day`);
    } else if (timeDiffInMonths < 1) {
      setFormattedTime(`${Math.floor(timeDiffInWeeks)} wk`);
    } else if (timeDiffInYears < 1) {
      setFormattedTime(`${Math.floor(timeDiffInMonths)} mo`);
    } else {
      setFormattedTime(`${Math.floor(timeDiffInYears)} yr`);
    }
  }, []);

  // handle accept friend request
  const handleAcceptFriendRequest = () => {
    axios
      .patch(
        `${SERVER_URL}/users/${userId}/acceptFriendRequest/?friendId=${friendId}`,
        {}
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log('Error:', e);
      });
  };

  return (
    <View
      style={[
        NotificationCardStyles.container,
        type === 'groupInvite' && NotificationCardStyles.containerGreen,
        type === 'friendRequest' && NotificationCardStyles.containerBlue,
      ]}>
      <View style={NotificationCardStyles.card}>
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
        <Text style={NotificationCardStyles.time}>{formattedTime} ago</Text>
      </View>
      {type === 'groupInvite' || type === 'friendRequest' ? (
        <View style={NotificationCardStyles.buttonrow}>
          <Pressable
            style={NotificationCardStyles.accept}
            onPress={handleAcceptFriendRequest}>
            <Ionicons name='checkmark' size={20} color='#2E491B' />
            <Text style={NotificationCardStyles.acceptButtonText}>Accept</Text>
          </Pressable>
          <Pressable style={NotificationCardStyles.decline}>
            <Feather name='x' size={20} color='#732014' />
            <Text style={NotificationCardStyles.declineButtonText}>
              Decline
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default NotificationCard;
