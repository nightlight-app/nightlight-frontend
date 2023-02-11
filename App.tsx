// External dependencies
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Internal dependencies
import { Route } from '@nightlight/src/types';

// Components
import TabBar from '@nightlight/components/navigation/TabBar';

// Styles

const Tab = createBottomTabNavigator();

// TEMP
const MapScreen = () => {
  return (
    <SafeAreaView>
      <Text>Map</Text>
    </SafeAreaView>
  );
};

// TEMP
const SocialScreen = () => {
  return (
    <SafeAreaView>
      <Text>Social</Text>
    </SafeAreaView>
  );
};

// TEMP
const EmergencyScreen = () => {
  return (
    <SafeAreaView>
      <Text>Emergency</Text>
    </SafeAreaView>
  );
};

// TEMP
const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <Text>Explore</Text>
    </SafeAreaView>
  );
};

// TEMP
const ProfileScreen = () => {
  return (
    <SafeAreaView>
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
        tabBar={(props: any) => <TabBar {...props} />}>
        <Tab.Screen name={Route.MAP} component={MapScreen} />
        <Tab.Screen name={Route.SOCIAL} component={SocialScreen} />
        <Tab.Screen name={Route.EMERGENCY} component={EmergencyScreen} />
        <Tab.Screen name={Route.EXPLORE} component={ExploreScreen} />
        <Tab.Screen name={Route.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
