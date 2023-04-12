import { SocialRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import NotificationsScreenStyles from './NotificationsScreen.styles';
import NotificationCard from '@nightlight/components/social/NotificationCard';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [counter, setCounter] = useState(0);

  // user id
  const { userDocument } = useAuthContext();
  let userid = userDocument?._id;

  useEffect(() => {
    customFetch({
      resourceUrl: `/notifications/?userId=${userid}`,
      options: {
        method: 'GET',
      },
    })
      .then(res => {
        setNotifications(res.data.notifications);
      })
      .catch(e => {
        console.log('Error: ', e);
      });

    let count = 0;
    notifications.forEach((item: { data: { notificationType: string } }) => {
      if (
        item.data.notificationType === 'friendRequest' ||
        item.data.notificationType === 'groupInvite'
      ) {
        count++;
      }
    });
    setCounter(count);
  }, [notifications]);

  // called when there are no notifications
  const renderEmptyGroup = () => (
    // TODO: figure out what to put here
    <View>
      <Text style={NotificationsScreenStyles.emptyAvailableUsersText}>
        No notifications yet
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      testID={SocialRoute.NOTIFICATIONS}
      style={NotificationsScreenStyles.screenContainer}>
      <ScrollView>
        <View style={NotificationsScreenStyles.topRow}>
          <Text style={NotificationsScreenStyles.title}>Notifications</Text>
          <View style={NotificationsScreenStyles.notifCircle}>
            <Text style={NotificationsScreenStyles.numberText}>{counter}</Text>
          </View>
        </View>
        <View style={NotificationsScreenStyles.notifList}>
          {notifications
            .sort(
              (
                a: { data: { notificationType: string } },
                b: { data: { notificationType: string } }
              ) => {
                if (
                  a.data.notificationType === 'friendRequest' ||
                  a.data.notificationType === 'groupInvite'
                ) {
                  return -1;
                } else if (
                  b.data.notificationType === 'friendRequest' ||
                  b.data.notificationType === 'groupInvite'
                ) {
                  return 1;
                } else {
                  return 0;
                }
              }
            )
            .map(
              (
                item: {
                  body: string;
                  userId: { $oid: string };
                  data: { notificationType: string; sentDateTime: string };
                },
                index
              ) => (
                <NotificationCard
                  key={index}
                  index={index}
                  message={item.body}
                  type={item.data.notificationType}
                  time={item.data.sentDateTime}
                  friendId={item.userId.$oid}></NotificationCard>
              )
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
