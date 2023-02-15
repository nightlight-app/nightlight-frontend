import React from 'react';
import { View, Pressable, SafeAreaView } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@nightlight/src/types';
import NavIcon from '@nightlight/components/navigation/NavIcon';
import EmergencyButton from '@nightlight/components/navigation/EmergencyButton';
import NavbarSvg from '@nightlight/assets/icons/NavbarSvg';
import tabBarStyles from '@nightlight/components/navigation/TabBar.styles';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <SafeAreaView style={tabBarStyles.navbarContainer}>
      <View style={tabBarStyles.navbar}>
        <View style={tabBarStyles.routesContainer}>
          {state.routes.map((route: any, index: number) => {
            // TODO: Fix type 'any' above (useful ref?: https://reactnavigation.org/docs/typescript/)
            // Uniquely handles the emergency button space
            if (route.name == Route.EMERGENCY) {
              return (
                <View key={index} style={tabBarStyles.emergencyButtonContainer}>
                  <EmergencyButton />
                </View>
              );
            }

            // Get the label from the route
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            // Determine if the route is focused
            const isFocused = state.index === index;

            // Only navigate if the route is not focused
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                accessibilityLabel={route.name}
                key={index}
                onPress={onPress}
                style={tabBarStyles.routeButton}>
                <NavIcon route={label} isFocused={isFocused} />
              </Pressable>
            );
          })}
        </View>
        <View style={tabBarStyles.backgroundSvgContainer}>
          <NavbarSvg />
          <View style={tabBarStyles.dangerZoneFill} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
