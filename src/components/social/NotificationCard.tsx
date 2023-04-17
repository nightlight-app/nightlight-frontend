import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { NotificationCardProps } from '@nightlight/src/types';
import NotificationCardStyles from './NotificationCard.styles';
import { Ionicons, Feather } from '@expo/vector-icons';
import { customFetch } from '@nightlight/src/api';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

const NotificationCard = ({
  index,
  message,
  time,
  friendId,
  type,
}: NotificationCardProps) => {
  const { userSession, userDocument } = useAuthContext();
  // user id
  let userId = userDocument?._id;
  const isEvenIndex = index % 2 !== 0;
  const [userImage, setUserImage] = useState(
    '@nightlight/assets/images/anon.png'
  );
  let [formattedTime, setFormattedTime] = useState('');

  // get user image from backend
  useEffect(() => {
    if (!userSession) return;

    customFetch({
      resourceUrl: `/users?userIds=${userId}`,
      options: {
        method: 'GET',
      },
    })
      .then(res => {
        setUserImage(res.users[0].imgUrlProfileSmall);
      })
      .catch(e => {
        // no profile photo found
        console.log('[NotificationCard] Error: ', e);
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
    customFetch({
      resourceUrl: `/users/${userId}/accept-friend-request/?friendId=${friendId}`,
      options: {
        method: 'PATCH',
      },
    })
      .then(res => {
        console.log(res);
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
            userImage
              ? { uri: `${userImage}` }
              : require('@nightlight/assets/images/anon.png')
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
          <Pressable style={NotificationCardStyles.decline}>
            <Feather name='x' size={20} color='#732014' />
            <Text style={NotificationCardStyles.declineButtonText}>
              Decline
            </Text>
          </Pressable>
          <Pressable
            style={NotificationCardStyles.accept}
            onPress={handleAcceptFriendRequest}>
            <Ionicons name='checkmark' size={20} color='#2E491B' />
            <Text style={NotificationCardStyles.acceptButtonText}>Accept</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default NotificationCard;
