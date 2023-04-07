import { SocialRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import NotificationsScreenStyles from './NotificationsScreen.styles';
import { testNotifications } from '@nightlight/src/testData';
import NotificationCard from '@nightlight/components/social/NotificationCard';
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(testNotifications);
  const [counter, setCounter] = useState(0);
  //TODO: need to pull notifications from backend (getNotifications)

  useEffect(() => {
    let count = 0;
    notifications.forEach((item) => {
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
          {notifications.sort((a,b)=> {
            if (a.data.notificationType === "friendRequest" || a.data.notificationType === "groupInvite") {
              return -1;
            } else if (b.data.notificationType === "friendRequest" || b.data.notificationType === "groupInvite") {
              return 1;
            } else {
              return 0;
            }
          }).map(
            (item: { body: string; userId: { $oid: string }; data: {notificationType: string} }, index) => (
              <NotificationCard
                index={index}
                message={item.body}
                type = {item.data.notificationType}
                userId={item.userId.$oid}></NotificationCard>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
