import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen'; // TODO: help TS is yelling at me :(
import { Route } from '@nightlight/src/types';

const Tab = createBottomTabNavigator();

const SocialScreen = () => {
  return (
    <SafeAreaView>
      <Text>Social</Text>
    </SafeAreaView>
  );
};

const PlaceholderScreen = () => {
  return (
    <SafeAreaView>
      <Text>Placeholder</Text>
    </SafeAreaView>
  );
};

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <Text>Explore</Text>
    </SafeAreaView>
  );
};

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
        <Tab.Screen name='Placeholder' component={PlaceholderScreen} />
        <Tab.Screen name={Route.EXPLORE} component={ExploreScreen} />
        <Tab.Screen name={Route.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
