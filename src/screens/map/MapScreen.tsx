import React, { useEffect, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import MapScreenStyles from '@nightlight/screens/map/MapScreen.styles';
import CreateGroupButton from '@nightlight/components/map/CreateGroupButton';
import VenueCard from '@nightlight/components/map/VenueCard';
import UserCard from '@nightlight/components/map/UserCard';
import CreateGroupCard from '@nightlight/components/map/CreateGroupCard';
import ErrorCard from '@nightlight/components/map/ErrorCard';
import { MapCardType, TabRoute, User } from '@nightlight/src/types';
import NightlightMap from '@nightlight/components/map/NightlightMap';
import { TEST_USERS, TEST_VENUES } from '@nightlight/src/testData';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import GroupMembers from '@nightlight/components/map/GroupMembers';
import ManageGroupCard from '@nightlight/components/map/ManageGroupCard';

const MapScreen = () => {
  // get the current user's document
  const { userDocument } = useAuthContext();

  // keep track of which map card is active
  const [activeMapCardType, setActiveMapCardType] =
    useState<MapCardType | null>(null);

  // keep track of the ID of the user to show in the user card
  const [activeUserCardId, setActiveUserCardId] = useState<string>();

  // handlers for map card buttons
  const handleShowVenueCard = () => {
    setActiveMapCardType(MapCardType.VENUE);
  };
  const handleShowCreateGroupCard = () => {
    setActiveMapCardType(MapCardType.CREATE_GROUP);
  };
  const handleShowManageGroupCard = () => {
    setActiveMapCardType(MapCardType.MANAGE_GROUP);
  };
  const handleShowErrorCard = () => {
    setActiveMapCardType(MapCardType.ERROR);
  };
  // TODO: use loading indicator instead of TEST_USER
  const handleShowUserCard = (userId = TEST_USERS[0]._id) => {
    setActiveMapCardType(MapCardType.USER);
    setActiveUserCardId(userId);
  };
  const handleCloseMapCard = () => {
    setActiveMapCardType(null);
    setActiveUserCardId(undefined);
  };

  useEffect(() => {
    // if user to show changes to another user, close the map card (then it will be re-opened)
    if (activeUserCardId) setActiveMapCardType(null);
  }, [activeUserCardId]);

  useEffect(() => {
    // if map card is closed but there is a user to show, open the user card
    if (activeMapCardType === null && activeUserCardId)
      setActiveMapCardType(MapCardType.USER);
  }, [activeMapCardType]);

  // render the selected map card
  const renderMapCard = (type: MapCardType) => {
    // TODO: switch out TEST_VENUES with real data
    switch (type) {
      case MapCardType.VENUE:
        return (
          <VenueCard venue={TEST_VENUES[0]} onClose={handleCloseMapCard} />
        );

      case MapCardType.USER:
        if (!activeUserCardId)
          return (
            <ErrorCard
              message='There was an error determining which user to show!'
              onClose={handleCloseMapCard}
            />
          );
        return (
          <UserCard userId={activeUserCardId} onClose={handleCloseMapCard} />
        );

      case MapCardType.CREATE_GROUP:
        return (
          <CreateGroupCard
            onClose={handleCloseMapCard}
            onError={handleShowErrorCard}
          />
        );

      case MapCardType.MANAGE_GROUP:
        return <ManageGroupCard onClose={handleCloseMapCard} />;

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
          onPress={() => handleShowUserCard(TEST_USERS[0]._id)}
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

      {/* Render group members if user is in a group, otherwise render Create Group Button */}
      {userDocument?.currentGroup ? (
        <GroupMembers onPress={handleShowManageGroupCard} />
      ) : (
        <CreateGroupButton onPress={handleShowCreateGroupCard} />
      )}

      {/* MapCards */}
      {activeMapCardType && renderMapCard(activeMapCardType)}
    </View>
  );
};

export default MapScreen;
