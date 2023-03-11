import { registerRootComponent } from 'expo';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
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

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Prevent hiding the splash screen
preventAutoHideAsync();

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
  const { user } = useAuthContext();

  const EmergencyButtonPlaceholderComponent = () => null;

  return (
    <NavigationContainer>
      {user ? (
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
