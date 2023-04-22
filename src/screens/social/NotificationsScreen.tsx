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
import { NativeStackScreenProps, SocialRoute } from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';
import NotificationCard from '@nightlight/components/social/NotificationCard';
import NotificationsScreenStyles from '@nightlight/screens/social/NotificationsScreen.styles';
import { COLORS } from '@nightlight/src/global.styles';

const NotificationsScreen = ({ navigation }: NativeStackScreenProps) => {
  // user id
  const { userDocument } = useAuthContext();
  const userId = userDocument?._id;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [counter, setCounter] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  // fetch notifications on first render
  useEffect(() => {
    fetchNotifications();
  }, []);

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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
