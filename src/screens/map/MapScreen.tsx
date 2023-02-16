import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, Venue, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const TEST_VENUE: Venue = {
  _id: '5f9f1b9b0b1b9c0017a1b1a1',
  name: 'The Bitter End',
  address: '147 Bleecker St, New York, NY 10012',
  location: {
    latitude: 40.729,
    longitude: -73.994,
  },
  reactions: {
    '🔥': {
      count: 21,
      didReact: true,
    },
    '⚠️': {
      count: 4,
      didReact: false,
    },
    '🛡️': {
      count: 54,
      didReact: true,
    },
    '💩': {
      count: 1,
      didReact: true,
    },
    '🎉': {
      count: 12,
      didReact: false,
    },
  },
};

const TEST_USER: User = {
  _id: '5f9f1b9b0b1b9c0017a1b1a2',
  imgUrlProfileSmall: '',
  firstName: 'Graham',
  lastName: 'Hemingway',
  lastActive: {
    location: {
      latitude: 24.294,
      longitude: 51.853,
    },
    time: new Date(),
  },
  phoneNumber: '615-555-5555',
};

const MapScreen = () => {
  const [activeMapCardType, setActiveMapCardType] = useState<
    MapCardType | undefined
  >(undefined);

  const handleShowVenueCard = () => setActiveMapCardType(MapCardType.VENUE);

  const handleShowUserCard = () => setActiveMapCardType(MapCardType.USER);

  const handleShowErrorCard = () => setActiveMapCardType(MapCardType.ERROR);

  const handleCloseMapCard = () => setActiveMapCardType(undefined);

  const renderMapCard = (type: MapCardType) => {
    switch (type) {
      case MapCardType.VENUE:
        return <VenueCard venue={TEST_VENUE} onClose={handleCloseMapCard} />;
      case MapCardType.USER:
        return <UserCard user={TEST_USER} onClose={handleCloseMapCard} />;
      default:
        return <ErrorCard onClose={handleCloseMapCard} />;
    }
  };

  return (
    <SafeAreaView style={MapScreenStyles.container}>
      {activeMapCardType && renderMapCard(activeMapCardType)}
      <Text>MapScreen</Text>
      <Text>activeMapCardType: {JSON.stringify(activeMapCardType)}</Text>
      <Pressable
        onPress={handleShowVenueCard}
        style={{
          backgroundColor: COLORS.NIGHTLIGHT_BLUE,
          padding: 10,
          width: 150,
          borderRadius: 10,
        }}>
        <Text>Show Venue Card</Text>
      </Pressable>
      <Pressable
        onPress={handleShowUserCard}
        style={{
          backgroundColor: COLORS.GREEN,
          padding: 10,
          width: 150,
          borderRadius: 10,
        }}>
        <Text>Show User Card</Text>
      </Pressable>
      <Pressable
        onPress={handleShowErrorCard}
        style={{
          backgroundColor: COLORS.RED,
          padding: 10,
          width: 150,
          borderRadius: 10,
        }}>
        <Text>Show Error Card</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MapScreen;
