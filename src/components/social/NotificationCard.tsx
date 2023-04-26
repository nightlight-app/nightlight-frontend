import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import {
  NotificationCardProps,
  NotificationType,
  User,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import NotificationCardStyles from '@nightlight/components/social/NotificationCard.styles';
import { getRelativeTimeString } from '@nightlight/src/utils/utils';
import { PRIORITIZED_NOTIFICATION_TYPES } from '@nightlight/src/constants';

const NotificationCard = ({
  notification,
  onActionSuccess,
}: NotificationCardProps) => {
  // user id
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  // notification data
  const {
    body: message,
    data: {
      notificationType,
      sentDateTime,
      senderId,
      senderFirstName,
      senderLastName,
      groupId,
    },
  } = notification;

  // is notfication a prioritized type
  const isPrioritized =
    PRIORITIZED_NOTIFICATION_TYPES.includes(notificationType);

  // sender object
  const [sender, setSender] = useState<User>();

  // TODO: notification should contain entire sender object instead of just senderId
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
    if (senderId) fetchSender();
  }, []);

  // friend request handlers
  const acceptFriendRequest = async () => {
    try {
      console.log('[NotificationCard] Accepting friend request...');
      const data = await customFetch({
        resourceUrl: `/users/${userId}/accept-friend-request?friendId=${senderId}`,
        options: {
          method: 'PATCH',
        },
      });

      onActionSuccess();

      console.log('[NotificationCard] Friend request accepted:\n', data);
    } catch (error) {
      console.error(
        '[NotificationCard] Error accepting friend request:\n',
        error
      );
    }
  };

  const declineFriendRequest = async () => {
    try {
      console.log('[NotificationCard] Declining friend request...');
      const data = await customFetch({
        resourceUrl: `/users/${userId}/decline-friend-request?friendId=${senderId}`,
        options: {
          method: 'PATCH',
        },
      });

      onActionSuccess();

      console.log('[NotificationCard] Friend request declined:\n', data);
    } catch (error) {
      console.error(
        '[NotificationCard] Error declining friend request:\n',
        error
      );
    }
  };

  // group invite handlers
  const acceptGroupInvite = async () => {
    try {
      console.log('[NotificationCard] Accepting group invite...');
      const data = await customFetch({
        resourceUrl: `/users/${userId}/accept-group-invitation?groupId=${groupId}`,
        options: {
          method: 'PATCH',
        },
      });

      onActionSuccess();

      console.log('[NotificationCard] Group invite accepted:\n', data);
    } catch (error) {
      console.error(
        '[NotificationCard] Error accepting group invite:\n',
        error
      );
    }
  };

  const declineGroupInvite = async () => {
    try {
      console.log('[NotificationCard] Declining group invite...');
      const data = await customFetch({
        resourceUrl: `/users/${userId}/decline-group-invitation?groupId=${groupId}`,
        options: {
          method: 'PATCH',
        },
      });

      onActionSuccess();

      console.log('[NotificationCard] Group invite declined:\n', data);
    } catch (error) {
      console.error(
        '[NotificationCard] Error declining group invite:\n',
        error
      );
    }
  };

  // on accept press
  const handleAccept = () => {
    switch (notificationType) {
      case NotificationType.FRIEND_REQUEST:
        acceptFriendRequest();
        break;
      case NotificationType.GROUP_INVITE:
        acceptGroupInvite();
        break;
      default:
        console.error(
          "[NotificationCard] You can't accept a noitification of type: ",
          notificationType
        );
        break;
    }
  };

  // on delete press
  const handleDelete = () => {
    switch (notificationType) {
      case NotificationType.FRIEND_REQUEST:
        declineFriendRequest();
        break;
      case NotificationType.GROUP_INVITE:
        declineGroupInvite();
        break;
      default:
        console.error(
          "[NotificationCard] You can't delete a noitification of type: ",
          notificationType
        );
        break;
    }
  };

  return (
    <View
      style={[
        NotificationCardStyles.container,
        isPrioritized && NotificationCardStyles.containerPrioritized,
        notificationType === NotificationType.FRIEND_REQUEST &&
          NotificationCardStyles.containerBlueBorder,
        notificationType === NotificationType.GROUP_INVITE &&
          NotificationCardStyles.containerGreenBorder,
      ]}>
      <View style={NotificationCardStyles.containerInfo}>
        {sender && (
          <View style={NotificationCardStyles.senderImageContainer}>
            {sender.imgUrlProfileSmall ? (
              <Image
                style={NotificationCardStyles.senderImage}
                source={{ uri: sender.imgUrlProfileSmall }}
              />
            ) : (
              <View style={NotificationCardStyles.senderImage}>
                <Text style={NotificationCardStyles.senderInitials}>
                  {senderFirstName[0]}
                  {senderLastName[0]}
                </Text>
              </View>
            )}
          </View>
        )}
        <View style={NotificationCardStyles.messageContainer}>
          {/* TODO: message should not include first name; in fact, messages should probably only be specified in the frontend. only type/sender/group needs to be in the backend */}
          <Text style={NotificationCardStyles.message}>
            {sender && (
              <Text style={NotificationCardStyles.senderName}>
                {senderFirstName} {senderLastName}{' '}
              </Text>
            )}
            {message}
          </Text>
        </View>
        <View style={NotificationCardStyles.timestampContainer}>
          <Text style={NotificationCardStyles.timestamp}>
            {getRelativeTimeString(sentDateTime)}
          </Text>
        </View>
      </View>
      {isPrioritized && (
        <View style={NotificationCardStyles.containerButtons}>
          <TouchableOpacity
            onPress={handleDelete}
            style={[
              NotificationCardStyles.button,
              NotificationCardStyles.buttonRed,
            ]}
            activeOpacity={0.75}>
            <Text style={NotificationCardStyles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAccept}
            style={[
              NotificationCardStyles.button,
              NotificationCardStyles.buttonGreen,
            ]}
            activeOpacity={0.75}>
            <Text style={NotificationCardStyles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NotificationCard;
