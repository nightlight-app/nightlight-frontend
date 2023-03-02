import React, { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import CreateGroupButton from '@nightlight/components/map/CreateGroupButton';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import CreateGroupCard from '@nightlight/components/map/CreateGroupCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, Route } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import NightlightMap from '@nightlight/components/map/NightlightMap';
import { TEST_USERS, TEST_VENUES } from '@nightlight/src/testData';

const MapScreen = () => {
  // keep track of which map card is active
  const [activeMapCardType, setActiveMapCardType] =
    useState<MapCardType | null>(null);

  // handlers for map card buttons
  const handleShowVenueCard = () => setActiveMapCardType(MapCardType.VENUE);
  const handleShowUserCard = () => setActiveMapCardType(MapCardType.USER);
  const handleShowCreateGroupCard = () =>
    setActiveMapCardType(MapCardType.CREATE_GROUP);
  const handleShowErrorCard = () => setActiveMapCardType(MapCardType.ERROR);
  const handleCloseMapCard = () => setActiveMapCardType(null);

  // render the selected map card
  const renderMapCard = (type: MapCardType) => {
    // TODO: switch out TEST_VENUES and TEST_USERS with real data
    switch (type) {
      case MapCardType.VENUE:
        return (
          <VenueCard venue={TEST_VENUES[0]} onClose={handleCloseMapCard} />
        );
      case MapCardType.USER:
        return <UserCard user={TEST_USERS[0]} onClose={handleCloseMapCard} />;
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
