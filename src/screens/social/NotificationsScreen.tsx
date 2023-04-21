import { SocialRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import NotificationsScreenStyles from './NotificationsScreen.styles';
import NotificationCard from '@nightlight/components/social/NotificationCard';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import NotificationCardStyles from '@nightlight/components/social/NotificationCard.styles';
const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [counter, setCounter] = useState(0);

  // user id
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;
  const [refreshing, setRefreshing] = useState<boolean>(false); // keep track of whether user is refreshing list of venues

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  // fetch venues on first render
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    console.log('[Notifications] Fetching notifications...');
    customFetch({
      resourceUrl: `/notifications/?userId=${userId}`,
      options: {
        method: 'GET',
      },
    })
      .then(res => {
        let count = 0;
        res.notifications.forEach(
          (item: { data: { notificationType: string } }) => {
            if (
              item.data.notificationType === 'friendRequest' ||
              item.data.notificationType === 'groupInvite'
            ) {
              count++;
            }
          }
        );
        setCounter(count);

        // sort notifications by time sent and type
        {
          res.notifications.sort((a: Notification, b: Notification) => {
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
              return new Date(b.sentDateTime) - new Date(a.sentDateTime);
            }
          });
        }
        setNotifications(res.notifications);
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  };

  // called when there are no notifications
  const renderEmptyGroup = () => (
    // TODO: figure out what to put here
    <View>
      <Text style={NotificationsScreenStyles.emptyAvailableUsersText}>
        No notifications yet
      </Text>
    </View>
  );

  const renderNotifCard = ({ item, index }) => (
    <NotificationCard
      key={index}
      index={index}
      message={item.body}
      type={item.data.notificationType}
      time={item.data.sentDateTime}
      friendId={item.data.senderId}
    />
  );

  const renderVenueCardSeparator = () => (
    <View style={NotificationsScreenStyles.notifCardSeparator} />
  );

  return (
    <SafeAreaView
      testID={SocialRoute.NOTIFICATIONS}
      style={NotificationsScreenStyles.screenContainer}>
      <View style={NotificationsScreenStyles.topRow}>
        <Text style={NotificationsScreenStyles.title}>Notifications</Text>
        <View style={NotificationsScreenStyles.notifCircle}>
          <Text style={NotificationsScreenStyles.numberText}>{counter}</Text>
        </View>
      </View>
      <FlatList
        style={NotificationsScreenStyles.notifList}
        contentContainerStyle={NotificationsScreenStyles.notifListContent}
        data={notifications}
        renderItem={renderNotifCard}
        keyExtractor={notification => notification._id}
        ListEmptyComponent={renderEmptyGroup}
        scrollEnabled={notifications.length > 0}
        ItemSeparatorComponent={renderVenueCardSeparator}
        indicatorStyle='white'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
