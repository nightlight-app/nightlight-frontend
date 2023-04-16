import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  // Retrieve the project ID from the Expo config
  const projectId = Constants.expoConfig?.extra?.eas.projectId;
  let token;

  if (isDevice) {
    // See if user allows access to push notifications on device
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permission to send push notifications
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }

    // Alert that the user does not allow push notifications
    if (finalStatus !== 'granted') {
      console.warn('[PNS] Failed to get push token for push notification!');
      return;
    }

    // Get the push token
    token = (
      await getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    // Print the token for development purposes
    console.log(token);
  } else {
    // Alert that the user must use a physical device to receive push notifications
    console.warn('[PNS] Must use physical device for Push Notifications');
  }

  // Set notification settings for Android
  if (Platform.OS === 'android') {
    setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Return the string expo push token - "ExponentPushToken[*************]""
  return token;
};
