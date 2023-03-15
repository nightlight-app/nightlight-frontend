import { registerRootComponent } from 'expo';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Platform } from 'react-native';
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

// TODO: export navigators to separate files?

import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoute, ProfileRoute, TabRoute } from '@nightlight/src/types';
import {
  AuthProvider,
  useAuthContext,
} from '@nightlight/src/contexts/AuthContext';
import SignInScreen from '@nightlight/screens/auth/SignInScreen';
import SignUpScreen from '@nightlight/screens/auth/SignUpScreen';
import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen';
import ExploreScreen from '@nightlight/screens/explore/ExploreScreen';
import SocialScreen from '@nightlight/screens/social/SocialScreen';
import ProfileScreen from '@nightlight/screens/profile/ProfileScreen';
import EmergencyContactsScreen from '@nightlight/screens/profile/EmergencyContactsScreen';
import { isDevice } from 'expo-device';
import { Subscription } from 'expo-modules-core';
import expoConfig from 'expo-constants';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
  Notification,
} from 'expo-notifications';

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Prevent hiding the splash screen
preventAutoHideAsync();

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const sendPushNotification = async (
  expoPushToken: string,
  title: string,
  body: string,
  data: any
) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

const registerForPushNotificationsAsync = async () => {
  // Retrieve the project ID from the Expo config
  const projectId = expoConfig?.extra?.eas.projectId;
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
      alert('Failed to get push token for push notification!');
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
    alert('Must use physical device for Push Notifications');
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

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={AuthRoute.SIGN_IN}
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={AuthRoute.SIGN_IN} component={SignInScreen} />
      <AuthStack.Screen name={AuthRoute.SIGN_UP} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const ProfileScreenStack = () => (
  <ProfileStack.Navigator
    initialRouteName={ProfileRoute.PROFILE}
    screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen
      name={ProfileRoute.PROFILE}
      component={ProfileScreen}
    />
    <ProfileStack.Screen
      name={ProfileRoute.EMERGENCY_CONTACTS}
      component={EmergencyContactsScreen}
    />
    {/* <Stack.Screen name={ProfileRoute.SETTINGS} component={SettingsScreen} /> */}
  </ProfileStack.Navigator>
);

const Main = () => {
  const { userSession } = useAuthContext();

  const EmergencyButtonPlaceholderComponent = () => null;

  return (
    <NavigationContainer>
      {userSession ? (
        <Tab.Navigator
          initialRouteName={TabRoute.MAP}
          screenOptions={{ headerShown: false }}
          tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
          <Tab.Screen name={TabRoute.MAP} component={MapScreen} />
          <Tab.Screen name={TabRoute.SOCIAL} component={SocialScreen} />

          {/* Placeholder to allocate space for emergency button to render in tab bar */}
          <Tab.Screen
            name={TabRoute.EMERGENCY_BUTTON}
            component={EmergencyButtonPlaceholderComponent}
          />

          <Tab.Screen name={TabRoute.EXPLORE} component={ExploreScreen} />
          <Tab.Screen
            name={TabRoute.PROFILE_STACK}
            component={ProfileScreenStack}
            initialParams={{ screen: ProfileRoute.PROFILE }}
          />
        </Tab.Navigator>
      ) : (
        <AuthScreenStack />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  // Notification state
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    // Listen for notifications (received while app is open or in background)
    notificationListener.current = addNotificationReceivedListener(
      notification => {
        setNotification(notification);
      }
    );

    // Listen for notification responses (tapping on notification)
    responseListener.current = addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      }
    );

    // Clean up listeners
    return () => {
      if (notificationListener.current && responseListener.current) {
        removeNotificationSubscription(notificationListener.current);
        removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Load fonts
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded and the UI is ready.
    if (fontsLoaded !== undefined) hideAsync();
  }, [fontsLoaded]);

  // Prevent rendering if fonts have not loaded
  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <StatusBar style='light' />
      <Main />
    </AuthProvider>
  );
};

registerRootComponent(App);

export default App;
