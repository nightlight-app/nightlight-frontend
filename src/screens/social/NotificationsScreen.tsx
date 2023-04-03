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
    setCounter(notifications.length)
  });

  // called when there are no active group
  const renderEmptyGroup = () => (
    // TODO: figure out what to put here
    <View>
      <Text style={NotificationsScreenStyles.emptyAvailableUsersText}>
        No active group
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      testID={SocialRoute.NOTIFICATIONS}
      style={NotificationsScreenStyles.screenContainer}>
      <ScrollView>
        <View style = {NotificationsScreenStyles.topRow}>
        <Text style={NotificationsScreenStyles.title}>Notifications</Text>
        <View style={NotificationsScreenStyles.notifCircle}>
              <Text style={NotificationsScreenStyles.numberText}>{counter}</Text>
            </View>
        </View>
        <View>
          {notifications.map((item: { body: string }, index) => (
            <NotificationCard
              index={index}
              message={item.body}></NotificationCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
