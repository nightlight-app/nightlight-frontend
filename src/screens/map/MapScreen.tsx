import React, { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import CreateGroupButton from '@nightlight/components/map/CreateGroupButton';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import CreateGroupCard from '@nightlight/components/map/CreateGroupCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, TabRoute, User } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import NightlightMap from '@nightlight/components/map/NightlightMap';
import { TEST_USERS, TEST_VENUES } from '@nightlight/src/testData';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import GroupMembers from '@nightlight/components/map/GroupMembers';

const MapScreen = () => {
  // get the current user's document
  const { userDocument } = useAuthContext();

  // keep track of which map card is active
  const [activeMapCardType, setActiveMapCardType] =
    useState<MapCardType | null>(null);

  // keep track of the user to show in the user card
  const [activeUser, setActiveUser] = useState<User>();

  // handlers for map card buttons
  const handleShowVenueCard = () => setActiveMapCardType(MapCardType.VENUE);
  // TODO: use loading indicator instead of TEST_USER
  const handleShowUserCard = (userToShow = TEST_USERS[0]) => {
    setActiveUser(userToShow);

    if (
      activeMapCardType !== MapCardType.USER ||
      activeUser?._id !== userToShow._id
    ) {
      // close the card first
      setActiveMapCardType(null);
      // then open the user card
      setActiveMapCardType(MapCardType.USER);
    } else {
      // close whatever card is currently open
      setActiveMapCardType(null);
    }
  };
  const handleShowCreateGroupCard = () =>
    setActiveMapCardType(MapCardType.CREATE_GROUP);
  const handleShowErrorCard = () => setActiveMapCardType(MapCardType.ERROR);
  const handleCloseMapCard = () => setActiveMapCardType(null);

  // render the selected map card
  const renderMapCard = (type: MapCardType) => {
    // TODO: switch out TEST_VENUES with real data
    switch (type) {
      case MapCardType.VENUE:
        return (
          <VenueCard venue={TEST_VENUES[0]} onClose={handleCloseMapCard} />
        );
      case MapCardType.USER:
        return (
          <UserCard
            // Renders a fallback user if activeUser is undefined
            user={activeUser || TEST_USERS[0]}
            onClose={handleCloseMapCard}
          />
        );
      case MapCardType.CREATE_GROUP:
        return (
          <CreateGroupCard
            onClose={handleCloseMapCard}
            onError={handleShowErrorCard}
          />
        );
      default:
        return <ErrorCard onClose={handleCloseMapCard} />;
    }
  };

  return (
    <View testID={TabRoute.MAP} style={MapScreenStyles.container}>
      {/* The one and only nightlight map, by the one and only nightlight team */}
      <NightlightMap onError={handleShowErrorCard} />

      {/* For development purpose */}
      {/* <View
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
      </View> */}

      {/* MapCards */}
      {activeMapCardType && renderMapCard(activeMapCardType)}

      {/* Conditionally render group button */}
      {userDocument?.currentGroup ? (
        <GroupMembers
          userOnPress={handleShowUserCard}
          addGroupOnPress={handleShowCreateGroupCard}
        />
      ) : (
        <CreateGroupButton onPress={handleShowCreateGroupCard} />
      )}
    </View>
  );
};

export default MapScreen;
