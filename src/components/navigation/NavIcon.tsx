import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TabRoute, NavIconProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const NavIcon = ({
  route,
  isFocused,
  size = 30,
  color = COLORS.WHITE,
  focusColor = COLORS.NIGHTLIGHT_BLUE,
}: NavIconProps) => {
  const renderIcon = (route: TabRoute) => {
    switch (route) {
      case TabRoute.MAP:
        return (
          <Entypo
            name='map'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case TabRoute.SOCIAL:
        return (
          <MaterialCommunityIcons
            name='account-group'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case TabRoute.EXPLORE:
        return (
          <Ionicons
            name='search'
            size={size}
            color={isFocused ? focusColor : color}
          />
        );
      case TabRoute.PROFILE_STACK:
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
