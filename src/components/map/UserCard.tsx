import React from 'react';
import { Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2'],
};

const UserCard = ({ user, onClose }: UserCardProps) => {
  const isFriend = myUser.friends.includes(user._id);

  return (
    <MapCard onClose={onClose} borderColor={COLORS.GREEN}>
      <Text
        style={{
          color: isFriend ? COLORS.GREEN : COLORS.RED,
          fontWeight: 'bold',
        }}>
        {!isFriend && 'NOT '}FRIEND
      </Text>
      {Object.entries(user).map(([field, value], index) => {
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold' }}>
              {field}:{' '}
            </Text>
            <Text style={{ color: COLORS.GREEN, flex: 1 }}>
              {JSON.stringify(value)}
            </Text>
          </View>
        );
      })}
    </MapCard>
  );
};

export default UserCard;
