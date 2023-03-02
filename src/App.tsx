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
import { TabRoute } from '@nightlight/src/types';
import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen';
import ExploreScreen from '@nightlight/screens/explore/ExploreScreen';
import ProfileScreenStack from '@nightlight/screens/profile/ProfileScreen';

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
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);

export default App;
