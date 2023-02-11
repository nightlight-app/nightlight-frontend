import React from 'react';
import { View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Route } from '@nightlight/src/types';

interface Props {
  route: Route;
  isFocused: boolean;
  size?: number;
  color?: string;
  focusColor?: string;
}

const NavIcon = ({
  route,
  isFocused,
  size = 30,
  color = '#FFFFFF',
  focusColor = '#4A86E8',
}: Props) => {
  const renderIcon = (route: Route) => {
    switch (route) {
      case Route.MAP:
        return (
          <Entypo
            name='map'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case Route.SOCIAL:
        return (
          <MaterialCommunityIcons
            name='account-group'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case Route.EXPLORE:
        return (
          <Ionicons
            name='search'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case Route.PROFILE:
        return (
          <FontAwesome
            name='id-card'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      default:
        return (
          <MaterialIcons name='disabled-by-default' size={size} color={color} />
        );
    }
  };

  return (
    <View
      style={
        isFocused && {
          shadowColor: focusColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }
      }>
      {renderIcon(route)}
    </View>
  );
};

export default NavIcon;
