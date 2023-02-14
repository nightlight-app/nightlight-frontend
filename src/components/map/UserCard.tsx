import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps, Location } from '@nightlight/src/types';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: COLORS.DARK_GRAY,
            borderColor: COLORS.GREEN,
            borderWidth: 2,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.WHITE,
              fontFamily: Fonts.COMFORTAA_BOLD,
              fontSize: 16,
            }}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.WHITE,
            fontSize: 20,
            fontFamily: Fonts.COMFORTAA_BOLD,
            marginRight: 10,
            maxWidth: '70%',
          }}>
          {user.firstName} {user.lastName}
        </Text>
        {isFriend && (
          <FontAwesome5 name='user-friends' size={16} color={COLORS.GRAY} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <View>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: 12,
              fontFamily: Fonts.COMFORTAA_REGULAR,
              marginBottom: 4,
            }}>
            Active {getRelativeTimeString(time)} ago
          </Text>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: 12,
              fontFamily: Fonts.COMFORTAA_REGULAR,
            }}>
            {user.phoneNumber}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: 12,
              fontFamily: Fonts.COMFORTAA_REGULAR,
              textAlign: 'center',
              marginRight: 5,
              maxWidth: 50,
            }}>
            0.3 miles
          </Text>
          <Pressable
            onPress={() => handleStartNavigation(location)}
            style={{
              backgroundColor: COLORS.GREEN,
              borderColor: COLORS.DARK_GREEN,
              borderWidth: 2,
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: 20,
                fontFamily: Fonts.COMFORTAA_BOLD,
                textAlign: 'center',
              }}>
              GO
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '105%',
          alignSelf: 'center',
          bottom: -30,
        }}>
        <Pressable
          onPress={handleCallUser}
          style={{
            flex: 1,
            backgroundColor: COLORS.GREEN,
            borderColor: COLORS.DARK_GREEN,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
          }}>
          <FontAwesome name='phone' size={18} color={COLORS.WHITE} />
          <Text
            style={{
              color: COLORS.WHITE,
              fontFamily: Fonts.COMFORTAA_BOLD,
              fontSize: 16,
              marginLeft: 5,
            }}>
            Call
          </Text>
        </Pressable>
        <View style={{ width: 100, marginHorizontal: 10 }} />
        <Pressable
          onPress={handlePingUser}
          style={{
            flex: 1,
            backgroundColor: COLORS.NIGHTLIGHT_BLUE,
            borderColor: COLORS.DARK_BLUE,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
          }}>
          <Feather name='radio' size={18} color={COLORS.WHITE} />
          <Text
            style={{
              color: COLORS.WHITE,
              fontFamily: Fonts.COMFORTAA_BOLD,
              fontSize: 16,
              marginLeft: 5,
            }}>
            Ping
          </Text>
        </Pressable>
      </View>
    </MapCard>
  );
};

export default UserCard;
