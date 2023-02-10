import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from './src/components/navigation/TabBar';

const Tab = createBottomTabNavigator();

const MapScreen = () => {
  return (
    <SafeAreaView>
      <Text>Map</Text>
    </SafeAreaView>
  );
};

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
        initialRouteName='Map'
        screenOptions={{ headerShown: false }}
        tabBar={(props: any) => <TabBar {...props} />}>
        <Tab.Screen name='Map' component={MapScreen} />
        <Tab.Screen name='Social' component={SocialScreen} />
        <Tab.Screen name='Placeholder' component={PlaceholderScreen} />
        <Tab.Screen name='Explore' component={ExploreScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
