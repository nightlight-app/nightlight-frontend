import React, { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import CreateGroupButton from '@nightlight/components/map/CreateGroupButton';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import CreateGroupCard from '@nightlight/components/map/CreateGroupCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, Venue, User, Route } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import NightlightMap from '@nightlight/components/map/NightlightMap';

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
  const [activeMapCardType, setActiveMapCardType] =
    useState<MapCardType | null>(null);

  const handleShowVenueCard = () => setActiveMapCardType(MapCardType.VENUE);
  const handleShowUserCard = () => setActiveMapCardType(MapCardType.USER);
  const handleShowCreateGroupCard = () =>
    setActiveMapCardType(MapCardType.CREATE_GROUP);
  const handleShowErrorCard = () => setActiveMapCardType(MapCardType.ERROR);
  const handleCloseMapCard = () => setActiveMapCardType(null);

  const renderMapCard = (type: MapCardType) => {
    switch (type) {
      case MapCardType.VENUE:
        return <VenueCard venue={TEST_VENUE} onClose={handleCloseMapCard} />;
      case MapCardType.USER:
        return <UserCard user={TEST_USER} onClose={handleCloseMapCard} />;
      case MapCardType.CREATE_GROUP:
        return <CreateGroupCard onClose={handleCloseMapCard} />;
      default:
        return <ErrorCard onClose={handleCloseMapCard} />;
    }
  };

  return (
    <View testID={Route.MAP} style={MapScreenStyles.container}>
      {/* The one and only nightlight map, by the one and only nightlight team */}
      <NightlightMap />

      {/* For development purpose */}
      <View
        style={{
          position: 'absolute',
          top: 120,
          left: 10,
        }}>
        <Text style={{ color: 'white' }}>
          activeMapCardType: {JSON.stringify(activeMapCardType)}
        </Text>
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
      </View>

      {/* MapCards */}
      {activeMapCardType && renderMapCard(activeMapCardType)}

      {/* TODO: Conditionally render group button */}
      <CreateGroupButton onPress={handleShowCreateGroupCard} />
    </View>
  );
};

export default MapScreen;
