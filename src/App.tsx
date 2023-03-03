import { registerRootComponent } from 'expo';
import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
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
import ExploreScreen from '@nightlight/screens/explore/ExploreScreen';
import ProfileScreen from '@nightlight/screens/profile/ProfileScreen';
import EmergencyContactsScreen from './screens/profile/EmergencyContactsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: Remove when social screen is implemented
const SocialScreen = () => {
  return (
    <SafeAreaView testID={TabRoute.SOCIAL}>
      <Text>Social</Text>
    </SafeAreaView>
  );
};

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
  // Load fonts
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded and the UI is ready.
    if (fontsLoaded) hideAsync();
  }, [fontsLoaded]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) return null;

  return (
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
  );
};

registerRootComponent(App);

export default App;
