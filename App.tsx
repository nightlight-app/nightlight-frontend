import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from 'components/navigation/TabBar';
import { Route } from 'src/types';

import ExploreScreen from 'src/screens/explore/ExploreScreen';

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
