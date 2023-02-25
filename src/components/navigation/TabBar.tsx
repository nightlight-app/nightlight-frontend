import React from 'react';
import { View, Pressable, SafeAreaView } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@nightlight/src/types';
import NavIcon from '@nightlight/components/navigation/NavIcon';
import EmergencyButton from '@nightlight/components/navigation/EmergencyButton';
import NavbarSvg from '@nightlight/components/svgs/NavbarSvg';
import TabBarStyles from '@nightlight/components/navigation/TabBar.styles';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <SafeAreaView style={TabBarStyles.navbarContainer}>
      <View style={TabBarStyles.navbar}>
        <View style={TabBarStyles.routesContainer}>
          {state.routes.map((route: any, index: number) => {
            // TODO: Fix type 'any' above (useful ref?: https://reactnavigation.org/docs/typescript/)
            // Uniquely handles the emergency button space
            if (route.name == Route.EMERGENCY) {
              return (
                <View key={index} style={TabBarStyles.emergencyButtonContainer}>
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
                style={TabBarStyles.routeButton}>
                <NavIcon route={label} isFocused={isFocused} />
              </Pressable>
            );
          })}
        </View>
        <View style={TabBarStyles.backgroundSvgContainer}>
          <NavbarSvg />
          <View style={TabBarStyles.dangerZoneFill} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
