import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps, Location } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import UserCardStyles from './UserCard.styles';
import {
  getRelativeTimeString,
  getStatusColor,
} from '@nightlight/src/utils/utils';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2'],
};

const UserCard = ({ user, onClose }: UserCardProps) => {
  const [lastActive, setLastActive] = useState(user.lastActive); // TODO: setLastActive when user is active?
  const [location, setLocation] = useState(user.lastActive.location);
  const [relativeTimeString, setRelativeTimeString] = useState('...');
  const [statusColor, setStatusColor] = useState(COLORS.NIGHTLIGHT_GRAY);

  // Update relative time string and status color every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTimeString(getRelativeTimeString(lastActive.time));
      setStatusColor(getStatusColor(lastActive.time));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update location and status color when lastActive changes
  useEffect(() => {
    setLocation(lastActive.location);
    setRelativeTimeString(getRelativeTimeString(lastActive.time));
    setStatusColor(getStatusColor(lastActive.time));
  }, [lastActive]);

  const isFriend = myUser.friends.includes(user._id);

  const handleStartNavigation = (destination: Location) => {
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  const handleCallUser = () => {
    alert(
      `TODO: Calling ${user.firstName} ${user.lastName} (Phone #: ${user.phoneNumber})...`
    );
  };

  const handlePingUser = () => {
    alert(
      `TODO: Pinging ${user.firstName} ${user.lastName} (ID: "${user._id}")...`
    );
  };

  return (
    <MapCard
      onClose={onClose}
      borderColor={statusColor}
      shadowColor={statusColor}>
      <View style={UserCardStyles.userHeaderContainer}>
        <View
          style={{
            ...UserCardStyles.userProfilePic,
            borderColor: statusColor,
          }}>
          <Text style={UserCardStyles.userProfilePicText}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        </View>
        <Text style={UserCardStyles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        {isFriend && (
          <FontAwesome5 name='user-friends' size={16} color={COLORS.GRAY} />
        )}
      </View>
      <View style={UserCardStyles.userDetailsContainer}>
        <View>
          <Text style={UserCardStyles.lastActiveText}>
            Active {relativeTimeString} ago
          </Text>
          <Text style={UserCardStyles.phoneNumber}>{user.phoneNumber}</Text>
        </View>
        <View style={UserCardStyles.navigationDetailsContainer}>
          <Text style={UserCardStyles.navigationDistanceText}>0.3 miles</Text>
          <Pressable
            accessibilityLabel='UserCardStartNavigation'
            onPress={() => handleStartNavigation(location)}
            style={UserCardStyles.navigationButton}>
            <Text style={UserCardStyles.navigationButtonText}>GO</Text>
          </Pressable>
        </View>
      </View>
      <View style={UserCardStyles.actionButtonsContainer}>
        <Pressable
          accessibilityLabel='UserCardCallUser'
          onPress={handleCallUser}
          style={UserCardStyles.callButton}>
          <FontAwesome name='phone' size={18} color={COLORS.WHITE} />
          <Text style={UserCardStyles.callButtonText}>Call</Text>
        </Pressable>
        <View style={UserCardStyles.actionButtonsDivider} />
        <Pressable
          accessibilityLabel='UserCardPingUser'
          onPress={handlePingUser}
          style={UserCardStyles.pingButton}>
          <Feather name='radio' size={18} color={COLORS.WHITE} />
          <Text style={UserCardStyles.pingButtonText}>Ping</Text>
        </Pressable>
      </View>
    </MapCard>
  );
};

export default UserCard;
