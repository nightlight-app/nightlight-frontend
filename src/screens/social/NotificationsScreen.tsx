import { SocialRoute } from '@nightlight/src/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, FlatList } from 'react-native';
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
  let userid = userDocument?._id;

  useEffect(() => {
    customFetch({
      resourceUrl: `/notifications/?userId=${userid}`,
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
        {res.notifications
          .sort(
            (a, b) => {
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
            }
          )}
        setNotifications(res.notifications);
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  }, []);

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
                  friendId={item.data.senderId}></NotificationCard>
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
        {/* <View style={NotificationsScreenStyles.notifList}>
          {counter === 0 && renderEmptyGroup()}
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
                  data: {
                    notificationType: string;
                    sentDateTime: string;
                    senderId: string;
                  };
                },
                index
              ) => (
                <NotificationCard
                  key={index}
                  index={index}
                  message={item.body}
                  type={item.data.notificationType}
                  time={item.data.sentDateTime}
                  friendId={item.data.senderId}></NotificationCard>
              )
            )} */}
        {/* </View> */}
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
          />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
