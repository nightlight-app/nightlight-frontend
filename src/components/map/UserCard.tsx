import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps, Location, TestingLabel } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import UserCardStyles from '@nightlight/components/map/UserCard.styles';
import {
  getRelativeTimeString,
  getStatusColor,
} from '@nightlight/src/utils/utils';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2', '5e9f1c5b0f1c9c0b5c8b4566'],
};

const UserCard = ({ user, onClose }: UserCardProps) => {
  const [lastActive, setLastActive] = useState(user.lastActive); // TODO: setLastActive when user is active?
  const [location, setLocation] = useState(user.lastActive.location);
  const [relativeTimeString, setRelativeTimeString] = useState('...');

  // TODO: Update status color based on lastActive
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
      `TODO: Calling ${user.firstName} ${user.lastName} (Phone #: ${user.phone})...`
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
      shadowColor={statusColor}
      buttonLeft={{
        backgroundColor: COLORS.GREEN,
        borderColor: COLORS.DARK_GREEN,
        iconComponent: (
          <FontAwesome name='phone' size={18} color={COLORS.WHITE} />
        ),
        text: 'Call',
        onPress: handleCallUser,
      }}
      buttonRight={{
        backgroundColor: COLORS.NIGHTLIGHT_BLUE,
        borderColor: COLORS.DARK_BLUE,
        iconComponent: <Feather name='radio' size={18} color={COLORS.WHITE} />,
        text: 'Ping',
        onPress: handlePingUser,
      }}>
      {/* User Header */}
      <View style={UserCardStyles.userHeaderContainer}>
        {/* Conditionally render user profile pic or initials */}
        {user.imgUrlProfileLarge ? (
          <Image
            source={{ uri: user.imgUrlProfileLarge }}
            style={{
              ...UserCardStyles.userProfilePic,
              borderColor: statusColor,
            }}
          />
        ) : (
          <Text style={UserCardStyles.userProfilePicText}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        )}
        <Text style={UserCardStyles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        {isFriend && (
          <FontAwesome5 name='user-friends' size={16} color={COLORS.GRAY} />
        )}
      </View>

      {/* User Details */}
      <View style={UserCardStyles.userDetailsContainer}>
        <View>
          <Text style={UserCardStyles.lastActiveText}>
            Active {relativeTimeString} ago
          </Text>
          <Text style={UserCardStyles.phoneNumber}>{user.phone}</Text>
        </View>
        <View style={UserCardStyles.navigationDetailsContainer}>
          <Text style={UserCardStyles.navigationDistanceText}>0.3 miles</Text>
          <Pressable
            accessibilityLabel={TestingLabel.USER_CARD_START_NAVIGATION}
            onPress={() => handleStartNavigation(location)}
            style={UserCardStyles.navigationButton}>
            {/* TODO: extract out GO component so it is reusable */}
            <Text style={UserCardStyles.navigationButtonText}>GO</Text>
          </Pressable>
        </View>
      </View>
    </MapCard>
  );
};

export default UserCard;
