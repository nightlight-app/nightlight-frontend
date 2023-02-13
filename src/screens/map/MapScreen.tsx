import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import mapScreenStyles from '@nightlight/screens/map/MapScreen.styles'; // TODO: help :(
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import { Venue, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const TEST_VENUE: Venue = {
  _id: '5f9f1b9b0b1b9c0017a1b1a1',
  name: 'The Bitter End',
  address: '147 Bleecker St, New York, NY 10012',
  location: {
    longitude: -73.994,
    latitude: 40.729,
  },
};

const TEST_USER: User = {
  _id: '5f9f1b9b0b1b9c0017a1b1a2',
  imgUrlProfileSmall: '',
  firstName: 'Graham',
  lastName: 'Hemingway',
  lastActive: {
    location: {
      longitude: -73.994,
      latitude: 40.729,
    },
    time: new Date(),
  },
  phoneNumber: '555-555-5555',
};

const MapScreen = () => {
  const [showMapCard, setShowMapCard] = useState(false);
  const [activeMapCardType, setActiveMapCardType] = useState('');

  // Reset activeMapCardType when map card is hidden
  useEffect(() => {
    if (!showMapCard) setActiveMapCardType('');
  }, [showMapCard]);

  const handleShowVenueCard = () => {
    setActiveMapCardType('venue');
    setShowMapCard(true);
  };

  const handleShowUserCard = () => {
    setActiveMapCardType('user');
    setShowMapCard(true);
  };

  const handleCloseMapCard = () => {
    setShowMapCard(false);
  };

  // TODO: is this the best way to do this?
  // TODO: export consts for match cases?
  const renderMapCard = (type: string) => {
    switch (type) {
      case 'venue':
        return <VenueCard venue={TEST_VENUE} onClose={handleCloseMapCard} />;
      case 'user':
        return <UserCard user={TEST_USER} onClose={handleCloseMapCard} />;
      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView style={mapScreenStyles.container}>
      {showMapCard && renderMapCard(activeMapCardType)}
      <Text>MapScreen</Text>
      <Text>showMapCard: {showMapCard ? 'true' : 'false'}</Text>
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
    </SafeAreaView>
  );
};

export default MapScreen;
