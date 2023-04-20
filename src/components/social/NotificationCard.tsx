import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { NotificationCardProps } from '@nightlight/src/types';
import NotificationCardStyles from '@nightlight/components/social/NotificationCard.styles';
import { Ionicons, Feather } from '@expo/vector-icons';
import { customFetch } from '@nightlight/src/api';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { getRelativeTimeString } from '@nightlight/src/utils/utils';

const NotificationCard = ({
  friendId,
  index,
  message,
  time,
  type,
}: NotificationCardProps) => {
  const { userSession, userDocument } = useAuthContext();
  // user id
  const userId = userDocument?._id;
  const isEvenIndex = index % 2 !== 0;
  const [userImage, setUserImage] = useState(
    '@nightlight/assets/images/anon.png'
  );
  const [formattedTime, setFormattedTime] = useState('');

  // get user image from backend
  useEffect(() => {
    if (!userSession) return;

    customFetch({
      resourceUrl: `/users?userIds=${friendId}`,
      options: {
        method: 'GET',
      },
    })
      .then(res => {
        setUserImage(res?.users[0].imgUrlProfileSmall);
      })
      .catch(e => {
        // no profile photo found
        console.log('[NotificationCard] Error: ', e);
      });

    // format time
    const timeThen = new Date(time);
    let timeNow = new Date();
    let timeDiff = timeNow.getTime() - timeThen.getTime();
    setFormattedTime(getRelativeTimeString(new Date(timeDiff)));
  }, []);

  const handleAcceptRequest = () => {
    // check type of notification
    if (type === 'friendRequest') {
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
          console.error('Error:', e);
        });
    } else {
      customFetch({
        resourceUrl: `/users/${userId}/accept-group-invite/?groupId=${friendId}`,
        options: {
          method: 'PATCH',
        },
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error('Error:', e);
        });
    }
  };

  const handleDeclineRequest = () => {
    console.log('decline request');
    if (type === 'friendRequest') {
      customFetch({
        resourceUrl: `/users/${userId}/decline-friend-request/?friendId=${friendId}`,
        options: {
          method: 'PATCH',
        },
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error('Error:', e);
        });
    } else {
      customFetch({
        resourceUrl: `/users/${userId}/decline-group-invite/?groupId=${friendId}`,
        options: {
          method: 'PATCH',
        },
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error('Error:', e);
        });
    }
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
            userImage != undefined
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
        <View style={NotificationCardStyles.buttonRow}>
          <Pressable
            style={NotificationCardStyles.decline}
            onPress={handleDeclineRequest}>
            <Feather name='x' size={20} color='#732014' />
            <Text style={NotificationCardStyles.declineButtonText}>
              Decline
            </Text>
          </Pressable>
          <Pressable
            style={NotificationCardStyles.accept}
            onPress={handleAcceptRequest}>
            <Ionicons name='checkmark' size={20} color='#2E491B' />
            <Text style={NotificationCardStyles.acceptButtonText}>Accept</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default NotificationCard;
