import { SocialRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import NotificationsScreenStyles from './NotificationsScreen.styles';
import { testNotifications } from '@nightlight/src/testData';
import NotificationCard from '@nightlight/components/social/NotificationCard';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [counter, setCounter] = useState(0);

  // user id
  const { userDocument } = useAuthContext();
  let userid = userDocument?._id;

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/notifications/?userId=${userid}`)
      .then(res => {
        setNotifications(res.data.notifications);
      })
      .catch(e => {
        console.log('Error: ', e);
      });

    let count = 0;
    notifications.forEach((item: {data:{notificationType: string}}) => {
      if (item.data.notificationType === "friendRequest" || item.data.notificationType === "groupInvite") {
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
          {notifications.sort((a: {data:{notificationType: string}},b: {data:{notificationType: string}})=> {
            if (a.data.notificationType === "friendRequest" || a.data.notificationType === "groupInvite") {
              return -1;
            } else if (b.data.notificationType === "friendRequest" || b.data.notificationType === "groupInvite") {
              return 1;
            } else {
              return 0;
            }
          }).map(
            (item: { body: string; userId: { $oid: string }; data: {notificationType: string, sentDateTime: string} }, index) => (
              <NotificationCard
                index={index}
                message={item.body}
                type = {item.data.notificationType}
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
