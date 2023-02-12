import React from 'react';
import { Text, View } from 'react-native';
import MapCard from '@nightlight/components/map/MapCard';
import { UserCardProps } from '@nightlight/src/types';

// TODO: Get user from Firebase auth
const myUser = {
  friends: ['5f9f1b9b0b1b9c0017a1b1a2'],
};

const UserCard = ({ user, onClose }: UserCardProps) => {
  const isFriend = myUser.friends.includes(user._id);

  return (
    <MapCard onClose={onClose} borderColor='#64A338'>
      <Text
        style={{ color: isFriend ? '#00ff00' : '#ff0000', fontWeight: 'bold' }}>
        {!isFriend && 'NOT '}friend
      </Text>
      {Object.entries(user).map(([field, value], index) => {
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{field}: </Text>
            <Text style={{ color: '#00ff00' }}>{JSON.stringify(value)}</Text>
          </View>
        );
      })}
    </MapCard>
  );
};

export default UserCard;
