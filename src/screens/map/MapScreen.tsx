import React, { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, Venue, User, Route } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import NightlightMap from '@nightlight/components/map/NightlightMap';
import { Ionicons } from '@expo/vector-icons';

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
    <View testID={Route.MAP} style={MapScreenStyles.container}>
      <NightlightMap />
      {activeMapCardType && renderMapCard(activeMapCardType)}

      {/* Interactable Buttons */}
      <Pressable
        style={[
          MapScreenStyles.mapControlButton,
          MapScreenStyles.currentLocationButton,
        ]}>
        <Ionicons name='md-navigate' size={32} color={COLORS.NIGHTLIGHT_BLUE} />
      </Pressable>
      <Pressable
        style={[
          MapScreenStyles.mapControlButton,
          MapScreenStyles.orientMapButton,
        ]}>
        <Ionicons name='md-compass' size={32} color={COLORS.WHITE} />
      </Pressable>

      {/* For development purpose */}
      <View style={{ position: 'absolute', top: 44, left: 10 }}>
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
      </View>
    </View>
  );
};

export default MapScreen;
