import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import {
  UserCardProps,
  Location,
  TestingLabel,
  User,
  LastActive,
} from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import UserCardStyles from '@nightlight/components/map/UserCard.styles';
import {
  getRelativeTimeString,
  getStatusColor,
} from '@nightlight/src/utils/utils';
import { customFetch } from '@nightlight/src/api';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2', '5e9f1c5b0f1c9c0b5c8b4566'],
};

const UserCard = ({ userId, onClose, onError }: UserCardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [lastActive, setLastActive] = useState<LastActive | undefined>();
  const [relativeTimeString, setRelativeTimeString] = useState<string>('...');
  const [statusColor, setStatusColor] = useState<string>(
    COLORS.NIGHTLIGHT_BLACK
  );

  const fetchUser = async () => {
    try {
      const data = await customFetch({
        resourceUrl: `/users?userIds=${userId}`,
        options: {
          method: 'GET',
        },
      });
      const user = data.users[0];

      return user;
    } catch (error) {
      console.error(
        '[UserCard] There was an error fetching user with ID',
        userId
      );
    }
  };

  // Update relative time string and status color every second
  useEffect(() => {
    // Fetch user and last active location on mount
    fetchUser()
      .then(user => {
        setUser(user);
        setLastActive(user.lastActive);
      })
      .catch(error => {
        console.error('[UserCard]\n', error);
        onError?.();
      });

    const interval = setInterval(() => {
      if (!lastActive) return;

      setRelativeTimeString(getRelativeTimeString(lastActive.time));
      setStatusColor(getStatusColor(lastActive.time));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update location and status color when lastActive changes
  useEffect(() => {
    if (!lastActive) return;

    setRelativeTimeString(getRelativeTimeString(lastActive.time));
    setStatusColor(getStatusColor(lastActive.time));
  }, [lastActive]);

  const isFriend = myUser.friends.includes(userId);

  const handleStartNavigation = () => {
    if (!lastActive) {
      console.error(
        '[UserCard] Could not start navigation to user with ID',
        userId
      );
      return;
    }

    const destination: Location = lastActive.location;
    alert(
      `TODO: Zi, take me to ${destination.latitude}, ${destination.longitude}, please!`
    );
  };

  const handleCallUser = () => {
    if (!user) {
      console.error('[UserCard] Could not call user with ID', userId);
      return;
    }

    alert(
      `TODO: Calling ${user.firstName} ${user.lastName} (Phone #: ${user.phone})...`
    );
  };

  const handlePingUser = () => {
    if (!user) {
      console.error('[UserCard] Could not call user with ID', userId);
      return;
    }

    alert(
      `TODO: Pinging ${user.firstName} ${user.lastName} (ID: "${userId}")...`
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
        {user?.imgUrlProfileLarge ? (
          <Image
            source={{ uri: user.imgUrlProfileLarge }}
            style={{
              ...UserCardStyles.userProfilePic,
              borderColor: statusColor,
            }}
          />
        ) : (
          <View
            style={{
              ...UserCardStyles.userProfilePic,
              borderColor: statusColor,
            }}>
            <Text style={UserCardStyles.userProfilePicText}>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </Text>
          </View>
        )}
        <Text style={UserCardStyles.userName}>
          {user?.firstName} {user?.lastName}
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
          <Text style={UserCardStyles.phoneNumber}>{user?.phone}</Text>
        </View>
        <View style={UserCardStyles.navigationDetailsContainer}>
          <Text style={UserCardStyles.navigationDistanceText}>0.3 miles</Text>
          <Pressable
            accessibilityLabel={TestingLabel.USER_CARD_START_NAVIGATION}
            onPress={handleStartNavigation}
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
