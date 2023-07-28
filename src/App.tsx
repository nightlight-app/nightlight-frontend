import { registerRootComponent } from 'expo';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { Subscription } from 'expo-modules-core';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
  setNotificationHandler,
  Notification,
} from 'expo-notifications';

// TODO: export navigators to separate files?

import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthRoute,
  ProfileRoute,
  TabRoute,
  SocialRoute,
  RootTabParamList,
  AuthStackParamList,
  SocialStackParamList,
  ProfileStackParamList,
} from '@nightlight/src/types';
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
import SettingsScreen from '@nightlight/screens/settings/SettingsScreen';
import { registerForPushNotificationsAsync } from '@nightlight/src/service/pushNotificationService';
import FriendSearchScreen from '@nightlight/screens/social/FriendSearchScreen';
import NotificationsScreen from '@nightlight/screens/social/NotificationsScreen';
import UserProfile from '@nightlight/screens/social/UserProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const SocialStack = createNativeStackNavigator<SocialStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Prevent hiding the splash screen
preventAutoHideAsync();

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

const SocialScreenStack = () => {
  return (
    <SocialStack.Navigator
      initialRouteName={SocialRoute.SOCIAL}
      screenOptions={{ headerShown: false }}>
      <SocialStack.Screen name={SocialRoute.SOCIAL} component={SocialScreen} />
      <SocialStack.Screen
        name={SocialRoute.FRIEND_SEARCH}
        component={FriendSearchScreen}
      />
      <SocialStack.Screen
        name={SocialRoute.NOTIFICATIONS}
        component={NotificationsScreen}
      />
      <SocialStack.Screen
        name={SocialRoute.USER_PROFILE}
        component={UserProfile}
      />
    </SocialStack.Navigator>
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
    <ProfileStack.Screen
      name={ProfileRoute.SETTINGS}
      component={SettingsScreen}
    />
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
          <Tab.Screen
            name={TabRoute.SOCIAL_STACK}
            component={SocialScreenStack}
          />

          {/* Placeholder to allocate space for emergency button to render in tab bar */}
          <Tab.Screen
            name={TabRoute.EMERGENCY_BUTTON}
            component={EmergencyButtonPlaceholderComponent}
          />

          <Tab.Screen name={TabRoute.EXPLORE} component={ExploreScreen} />
          <Tab.Screen
            name={TabRoute.PROFILE_STACK}
            component={ProfileScreenStack}
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
