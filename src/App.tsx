import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@nightlight/src/types';
import TabBar from '@nightlight/components/navigation/TabBar';

const Tab = createBottomTabNavigator();

// TEMP
const MapScreen = () => {
  return (
    <SafeAreaView testID='MapScreen'>
      <Text>Map</Text>
    </SafeAreaView>
  );
};

// TEMP
const SocialScreen = () => {
  return (
    <SafeAreaView testID='SocialScreen'>
      <Text>Social</Text>
    </SafeAreaView>
  );
};

// TEMP
const EmergencyScreen = () => {
  return (
    <SafeAreaView testID='EmergencyScreen'>
      <Text>Emergency</Text>
    </SafeAreaView>
  );
};

// TEMP
const ExploreScreen = () => {
  return (
    <SafeAreaView testID='ExploreScreen'>
      <Text>Explore</Text>
    </SafeAreaView>
  );
};

// TEMP
const ProfileScreen = () => {
  return (
    <SafeAreaView testID='ProfileScreen'>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

const App = () => {
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
