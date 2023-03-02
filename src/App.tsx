import { registerRootComponent } from 'expo';
import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
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
import { Route } from '@nightlight/src/types';
import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen';
import ExploreScreen from '@nightlight/screens/explore/ExploreScreen';
import ProfileScreen from '@nightlight/screens/profile/ProfileScreen';
import SocialScreen from './screens/social/SocialScreen';

const Tab = createBottomTabNavigator();


// TEMP
const EmergencyScreen = () => {
  return (
    <SafeAreaView testID={Route.EMERGENCY}>
      <Text>Emergency</Text>
    </SafeAreaView>
  );
};

// Prevent hiding the splash screen
preventAutoHideAsync();

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
  );
};

registerRootComponent(App);

export default App;
