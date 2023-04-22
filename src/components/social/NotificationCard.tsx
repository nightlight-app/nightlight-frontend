import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { NotificationCardProps, User } from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import NotificationCardStyles from '@nightlight/components/social/NotificationCard.styles';
import { getRelativeTimeString } from '@nightlight/src/utils/utils';

const NotificationCard = ({ notification }: NotificationCardProps) => {
  // user id
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  // notification data
  const {
    body: message,
    data: { notificationType: type, sentDateTime, senderId },
  } = notification;

  // sender object
  const [sender, setSender] = useState<User>();

  // TODO: notification should container entire sender object instead of just senderId
  // so we don't have to make a separate request to get the sender's info
  const fetchSender = async () => {
    try {
      console.log('[NotificationCard] Fetching sender...');
      const data = await customFetch({
        resourceUrl: `/users?userIds=${senderId}`,
        options: {
          method: 'GET',
        },
      });

      // set sender
      setSender(data.users[0]);
    } catch (error) {
      console.error('[NotificationCard] Error fetching sender:\n', error);
    }
  };

  // get user image from backend
  useEffect(() => {
    fetchSender();
  }, []);

  const handleAcceptRequest = () => {
    // check type of notification
    // if (type === 'friendRequest') {
    //   customFetch({
    //     resourceUrl: `/users/${userId}/accept-friend-request/?friendId=${senderId}`,
    //     options: {
    //       method: 'PATCH',
    //     },
    //   })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(e => {
    //       console.error('Error:', e);
    //     });
    // } else {
    //   customFetch({
    //     resourceUrl: `/users/${userId}/accept-group-invite/?groupId=${senderId}`,
    //     options: {
    //       method: 'PATCH',
    //     },
    //   })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(e => {
    //       console.error('Error:', e);
    //     });
    // }
  };

  const handleDeclineRequest = () => {
    // console.log('decline request');
    // if (type === 'friendRequest') {
    //   customFetch({
    //     resourceUrl: `/users/${userId}/decline-friend-request/?friendId=${senderId}`,
    //     options: {
    //       method: 'PATCH',
    //     },
    //   })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(e => {
    //       console.error('Error:', e);
    //     });
    // } else {
    //   customFetch({
    //     resourceUrl: `/users/${userId}/decline-group-invite/?groupId=${notification.data.groupId}`,
    //     options: {
    //       method: 'PATCH',
    //     },
    //   })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(e => {
    //       console.error('Error:', e);
    //     });
    // }
  };

  return (
    <View style={NotificationCardStyles.container}>
      <View style={NotificationCardStyles.senderImageContainer}>
        {sender?.imgUrlProfileSmall ? (
          <Image
            style={NotificationCardStyles.senderImage}
            source={{ uri: sender.imgUrlProfileSmall }}
          />
        ) : (
          <View style={NotificationCardStyles.senderImage}>
            <Text style={NotificationCardStyles.senderInitials}>
              {sender?.firstName[0]}
              {sender?.lastName[0]}
            </Text>
          </View>
        )}
      </View>
      <View style={NotificationCardStyles.messageContainer}>
        {/* TODO: message should not include first name; in fact, messages should probably only be specified in the frontend. only type/sender/group needs to be in the backend */}
        <Text style={NotificationCardStyles.message}>
          <Text style={NotificationCardStyles.senderName}>
            {sender?.firstName} {sender?.lastName}{' '}
          </Text>
          {message}
        </Text>
      </View>
      <View style={NotificationCardStyles.timestampContainer}>
        <Text style={NotificationCardStyles.timestamp}>
          {getRelativeTimeString(sentDateTime)}
        </Text>
      </View>
    </View>
    // <View
    //   style={[
    //     NotificationCardStyles.container,
    //     type === 'groupInvite' && NotificationCardStyles.containerGreen,
    //     type === 'friendRequest' && NotificationCardStyles.containerBlue,
    //   ]}>
    //   <View style={NotificationCardStyles.card}>
    //     <Image
    //       source={
    //         userImage != undefined
    //           ? { uri: `${userImage}` }
    //           : require('@nightlight/assets/images/anon.png')
    //       }
    //       style={NotificationCardStyles.profileImage}
    //     />
    //     <View style={NotificationCardStyles.textbox}>
    //       <Text style={NotificationCardStyles.message}>{message}</Text>
    //     </View>
    //     <Text style={NotificationCardStyles.time}>
    //       {getRelativeTimeString(sentDateTime)}
    //     </Text>
    //   </View>
    //   {type === 'groupInvite' || type === 'friendRequest' ? (
    //     <View style={NotificationCardStyles.buttonRow}>
    //       <Pressable
    //         style={NotificationCardStyles.decline}
    //         onPress={handleDeclineRequest}>
    //         <Feather name='x' size={20} color='#732014' />
    //         <Text style={NotificationCardStyles.declineButtonText}>
    //           Decline
    //         </Text>
    //       </Pressable>
    //       <Pressable
    //         style={NotificationCardStyles.accept}
    //         onPress={handleAcceptRequest}>
    //         <Ionicons name='checkmark' size={20} color='#2E491B' />
    //         <Text style={NotificationCardStyles.acceptButtonText}>Accept</Text>
    //       </Pressable>
    //     </View>
    //   ) : null}
    // </View>
  );
};

export default NotificationCard;
