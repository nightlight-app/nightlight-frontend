import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  NativeStackScreenProps,
  SocialRoute,
  Notification,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import NotificationCard from '@nightlight/components/social/NotificationCard';
import NotificationsScreenStyles from '@nightlight/screens/social/NotificationsScreen.styles';
import { COLORS } from '@nightlight/src/global.styles';
import { PRIORITIZED_NOTIFICATION_TYPES } from '@nightlight/src/constants';

const NotificationsScreen = ({ navigation }: NativeStackScreenProps) => {
  // user id
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sortedNotifications, setSortedNotifications] = useState<
    Notification[]
  >([]);
  const [numPrioritizedNotifications, setNumPrioritizedNotifications] =
    useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNotifications = async () => {
    try {
      console.log('[Notifications] Fetching notifications...');

      const data = await customFetch({
        resourceUrl: `/notifications/?userId=${userId}`,
        options: {
          method: 'GET',
        },
      });

      setNotifications(data.notifications);
    } catch (error) {
      console.error('[Notifications] Error fetching notifications:\n', error);
    }
  };

  // fetch notifications on first render
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    // sort notifications by time sent and type
    const sortedNotifications = [...notifications];
    sortedNotifications.sort((a: Notification, b: Notification) => {
      const typeA = a.data.notificationType;
      const typeB = b.data.notificationType;

      const timeA = new Date(a.data.sentDateTime) as unknown as number;
      const timeB = new Date(b.data.sentDateTime) as unknown as number;

      const isPrioritizedA = PRIORITIZED_NOTIFICATION_TYPES.includes(typeA);
      const isPrioritizedB = PRIORITIZED_NOTIFICATION_TYPES.includes(typeB);

      return isPrioritizedA === isPrioritizedB
        ? timeB - timeA // XNOR gate (both are prioritized or neither is prioritized), sort by time
        : isPrioritizedA
        ? -1 // only a is prioritized
        : 1; // only b is prioritized
    });

    setSortedNotifications(sortedNotifications);

    // count number of prioritized notifications
    const numPrioritizedNotifications = notifications.filter(notification =>
      PRIORITIZED_NOTIFICATION_TYPES.includes(
        notification.data.notificationType
      )
    ).length;

    setNumPrioritizedNotifications(numPrioritizedNotifications);
  }, [notifications]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const renderEmptyNotifications = () => (
    <View style={NotificationsScreenStyles.emptyNotificationsContainer}>
      <Text style={NotificationsScreenStyles.emptyNotificationsText}>
        You haven't received any notifications yet!
      </Text>
    </View>
  );

  const renderNotificationCard = ({
    item,
    index,
  }: ListRenderItemInfo<Notification>) => (
    <NotificationCard notification={item} />
  );

  const renderNotificationCardSeparator = () => (
    <View style={NotificationsScreenStyles.notificationCardSeparator} />
  );

  return (
    <SafeAreaView
      testID={SocialRoute.NOTIFICATIONS}
      style={NotificationsScreenStyles.container}>
      <View style={NotificationsScreenStyles.contentContainer}>
        <View style={NotificationsScreenStyles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={NotificationsScreenStyles.headerButton}
            activeOpacity={0.75}>
            <AntDesign name='left' size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={NotificationsScreenStyles.title}>Notifications</Text>
          <View style={NotificationsScreenStyles.notificationCountContainer}>
            <Text style={NotificationsScreenStyles.notificationCount}>
              {numPrioritizedNotifications}
            </Text>
          </View>
        </View>
        <FlatList
          style={NotificationsScreenStyles.notificationsList}
          contentContainerStyle={
            NotificationsScreenStyles.notificationsListContent
          }
          data={sortedNotifications}
          renderItem={renderNotificationCard}
          keyExtractor={notification => notification._id}
          ListEmptyComponent={renderEmptyNotifications}
          ItemSeparatorComponent={renderNotificationCardSeparator}
          indicatorStyle='white'
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.GRAY}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
