import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
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
import { Route } from '@nightlight/src/types';
import TabBar from '@nightlight/components/navigation/TabBar';
import MapScreen from '@nightlight/screens/map/MapScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import firebase from 'firebase';
import LoginScreen from './screens/login/LoginScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const SocialScreen = () => {
  return (
    <SafeAreaView testID={Route.SOCIAL}>
      <Text>Social</Text>
    </SafeAreaView>
  );
};

// TEMP
const EmergencyScreen = () => {
  return (
    <SafeAreaView testID={Route.EMERGENCY}>
      <Text>Emergency</Text>
    </SafeAreaView>
  );
};

// TEMP
const ExploreScreen = () => {
  return (
    <SafeAreaView testID={Route.EXPLORE}>
      <Text>Explore</Text>
    </SafeAreaView>
  );
};

// Prevent hiding the splash screen
preventAutoHideAsync();

const App = () => {
  // state variable for if the user is logged in through firebase
  const [isUser, setIsUser] = useState<boolean | undefined>(undefined);

  // state variable for if the page is login or register
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // check if user is logged in and set appropriate state variable accordingly
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });

  // Load fonts
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
    Roboto_500Medium,
  });

  useEffect(() => {
    // Hide the splash screen after the fonts have loaded, the user is identified, and the UI is ready.
    if (fontsLoaded && isUser !== undefined) hideAsync();
  }, [fontsLoaded, isUser]);

  // Prevent rendering until the font has loaded and user has been identified
  if (!fontsLoaded || isUser === undefined) return null;

  return isUser ? (
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
  ) : isLogin ? (
    <LoginScreen setIsLogin={setIsLogin} />
  ) : (
    <RegisterScreen setIsLogin={setIsLogin} />
  );
};

registerRootComponent(App);

export default App;
