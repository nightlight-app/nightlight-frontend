import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import mapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import { MapCardTypes, Venue, User } from '@nightlight/src/types';
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
  const [activeMapCardType, setActiveMapCardType] = useState<
    MapCardTypes | undefined
  >(undefined);

  const handleShowVenueCard = () => {
    setActiveMapCardType(MapCardTypes.VENUE);
  };

  const handleShowUserCard = () => {
    setActiveMapCardType(MapCardTypes.USER);
  };

  const handleCloseMapCard = () => {
    setActiveMapCardType(undefined);
  };

  const renderMapCard = (type: MapCardTypes) => {
    switch (type) {
      case MapCardTypes.VENUE:
        return <VenueCard venue={TEST_VENUE} onClose={handleCloseMapCard} />;
      case MapCardTypes.USER:
        return <UserCard user={TEST_USER} onClose={handleCloseMapCard} />;
      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView style={mapScreenStyles.container}>
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
    </SafeAreaView>
  );
};

export default MapScreen;
