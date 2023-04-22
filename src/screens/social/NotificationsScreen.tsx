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
import { NativeStackScreenProps, SocialRoute, Notification } from '@nightlight/src/types';
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

  // sort notifications by time sent and type
  useEffect(() => {
    const sortedNotifications = [...notifications];
    sortedNotifications.sort((a: Notification, b: Notification) => {
      const typeA = a.data.notificationType;
      const typeB = b.data.notificationType;
      const timeA = new Date(a.data.sentDateTime) as unknown as number;
      const timeB = new Date(b.data.sentDateTime) as unknown as number;

      // a is prioritized
      if (PRIORITIZED_NOTIFICATION_TYPES.includes(typeA)) return -1;

      // b is prioritized
      if (PRIORITIZED_NOTIFICATION_TYPES.includes(typeB)) return 1;

      // neither is prioritized, sort by time
      return Math.abs(timeB - timeA);
    });

    setSortedNotifications(sortedNotifications);
  }, [notifications]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
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

  const renderNotifCard = ({
    item,
    index,
  }: ListRenderItemInfo<Notification>) => (
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
            <Text style={NotificationsScreenStyles.notificationCount}>8</Text>
          </View>
        </View>
        <FlatList
          style={NotificationsScreenStyles.notifList}
          contentContainerStyle={NotificationsScreenStyles.notifListContent}
          data={sortedNotifications}
          renderItem={renderNotifCard}
          keyExtractor={notification => notification._id}
          ListEmptyComponent={renderEmptyGroup}
          scrollEnabled={sortedNotifications.length > 0}
          ItemSeparatorComponent={renderVenueCardSeparator}
          indicatorStyle='white'
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
