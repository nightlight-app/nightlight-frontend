import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileRoute, TabRoute } from '@nightlight/src/types';
import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen';
import firebase from 'firebase';
import ExploreScreen from '@nightlight/screens/explore/ExploreScreen';
import SocialScreen from '@nightlight/screens/social/SocialScreen';
import ProfileScreen from '@nightlight/screens/profile/ProfileScreen';
<<<<<<< HEAD
import AuthScreen from '@nightlight/screens/auth/Auth';
=======
import EmergencyContactsScreen from '@nightlight/screens/profile/EmergencyContactsScreen';
>>>>>>> main

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EmergencyButtonComponentPlaceholder = () => null;

// Prevent hiding the splash screen
preventAutoHideAsync();

const ProfileScreenStack = () => (
  <Stack.Navigator
    initialRouteName={ProfileRoute.PROFILE}
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ProfileRoute.PROFILE} component={ProfileScreen} />
    <Stack.Screen
      name={ProfileRoute.EMERGENCY_CONTACTS}
      component={EmergencyContactsScreen}
    />
    {/* <Stack.Screen name={ProfileRoute.SETTINGS} component={SettingsScreen} /> */}
  </Stack.Navigator>
);

const App = () => {
  // state variable for if the user is logged in through firebase
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();

  // check if user is logged in and set appropriate state variable accordingly
  firebase.auth().onAuthStateChanged(user => {
    if (user) setIsUserLoggedIn(true);
    else setIsUserLoggedIn(false);
  });

  // Load fonts
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded, the user is identified, and the UI is ready.
    if (fontsLoaded && isUserLoggedIn !== undefined) hideAsync();
  }, [fontsLoaded, isUserLoggedIn]);

  // Prevent rendering until the font has loaded and user has been identified
  if (!fontsLoaded || isUserLoggedIn === undefined) return null;

  return (
<<<<<<< HEAD
    <>
      {isUserLoggedIn && (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={Route.MAP}
            screenOptions={{ headerShown: false }}
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
            <Tab.Screen name={Route.MAP} component={MapScreen} />
            <Tab.Screen name={Route.SOCIAL} component={SocialScreen} />
            <Tab.Screen name={Route.EMERGENCY} component={EmergencyScreen} />
            <Tab.Screen name={Route.EXPLORE} component={ExploreScreen} />
            <Tab.Screen name={Route.PROFILE} component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
      {!isUserLoggedIn && <AuthScreen />}
    </>
=======
    <NavigationContainer>
      <StatusBar style='light' />
      <Tab.Navigator
        initialRouteName={TabRoute.MAP}
        screenOptions={{ headerShown: false }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
        <Tab.Screen name={TabRoute.MAP} component={MapScreen} />
        <Tab.Screen name={TabRoute.SOCIAL} component={SocialScreen} />

        {/* Placeholder to allocate space for emergency button to render in tab bar */}
        <Tab.Screen
          name={TabRoute.EMERGENCY_BUTTON}
          component={EmergencyButtonComponentPlaceholder}
        />

        <Tab.Screen name={TabRoute.EXPLORE} component={ExploreScreen} />
        <Tab.Screen
          name={TabRoute.PROFILE_STACK}
          component={ProfileScreenStack}
          initialParams={{ screen: ProfileRoute.PROFILE }}
        />
      </Tab.Navigator>
    </NavigationContainer>
>>>>>>> main
  );
};

registerRootComponent(App);

export default App;
