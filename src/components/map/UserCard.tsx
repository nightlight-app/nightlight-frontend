import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps, Location } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import UserCardStyles from './UserCard.styles';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2'],
};

const getRelativeTimeString = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
};

const UserCard = ({ user, onClose }: UserCardProps) => {
  const [lastActive, setLastActive] = useState(user.lastActive);
  const [location, setLocation] = useState(user.lastActive.location);
  const [time, setTime] = useState(user.lastActive.time);

  useEffect(() => {
    setLocation(lastActive.location);
    setTime(lastActive.time);
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
    <MapCard onClose={onClose} borderColor={COLORS.GREEN}>
      <View style={UserCardStyles.userHeaderContainer}>
        <View style={UserCardStyles.userProfilePic}>
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
            Active {getRelativeTimeString(time)} ago
          </Text>
          <Text style={UserCardStyles.phoneNumber}>{user.phoneNumber}</Text>
        </View>
        <View style={UserCardStyles.navigationDetailsContainer}>
          <Text style={UserCardStyles.navigationDistanceText}>0.3 miles</Text>
          <Pressable
            onPress={() => handleStartNavigation(location)}
            style={UserCardStyles.navigationButton}>
            <Text style={UserCardStyles.navigationButtonText}>GO</Text>
          </Pressable>
        </View>
      </View>
      <View style={UserCardStyles.actionButtonsContainer}>
        <Pressable onPress={handleCallUser} style={UserCardStyles.callButton}>
          <FontAwesome name='phone' size={18} color={COLORS.WHITE} />
          <Text style={UserCardStyles.callButtonText}>Call</Text>
        </Pressable>
        <View style={UserCardStyles.actionButtonsDivider} />
        <Pressable onPress={handlePingUser} style={UserCardStyles.pingButton}>
          <Feather name='radio' size={18} color={COLORS.WHITE} />
          <Text style={UserCardStyles.pingButtonText}>Ping</Text>
        </Pressable>
      </View>
    </MapCard>
  );
};

export default UserCard;
