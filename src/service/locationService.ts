import { Markers, User, UserMarkerMap } from '@nightlight/src/types';
import { customFetch } from '@nightlight/src/api';

/**
 * The types of location service events that are available.
 */
export enum LocationServiceEvent {
  BROADCAST_LOCATION = 'broadcastLocation',
}

/**
 * The data that is sent alongside BROADCAST_LOCATION event.
 */
export interface BroadcastEventData {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Location service event data is the union of all possible event data.
 */
export type LocationServiceData = BroadcastEventData;

/**
 * Location service event handler for NightlightMap.
 * @param event The event to handle.
 * @param eventData The data that is sent with the event.
 * @param markers The current list of user markers (reference).
 * @param setUserMarkers The setState function to update the user markers.
 * @param userDocument The current user's document.
 */
export const locationServiceHandler = ({
  event,
  eventData,
  markers,
  setUserMarkers,
  userDocument,
}: {
  event: LocationServiceEvent;
  eventData?: LocationServiceData;
  markers: UserMarkerMap;
  setUserMarkers: React.Dispatch<React.SetStateAction<UserMarkerMap>>;
  userDocument?: User;
}) => {
  /**
   * The handler when BROADCAST_LOCATION event is received.
   *
   * 1. The BROADCAST_LOCATION event is sent from the socket server when a user's location is updated.
   * 2. The received 'data' contains the user's id and location.
   * 3. If the user is the current user, ignore the event because the current user's location is already being tracked locally
   * 4. If the user is already in userMarkers, update their location right away.
   * 5. If the user is not in userMarkers, fetch their profile picture url first then update their location (cache their profile img url)
   *
   * @param data The LocationServiceData object that is sent from the socket server.
   */
  const onBroadcastLocation = (data: BroadcastEventData) => {
    // ignore current users' location because it is already being tracked
    if (data.userId === userDocument?._id) return;

    // if the user is already in userMarkers, update their location right away
    if (markers[data.userId]) {
      const newObj: Markers = {
        imgUrl: markers[data.userId].imgUrl,
        location: data.location,
      };
      setUserMarkers(prev => ({ ...prev, [data.userId]: newObj }));
    } else {
      // if the user is not in userMarkers, fetch their profile picture url first
      // then add them to the list
      // TODO: this is a bit inefficient as we only need imgUrlProfileLarge.
      // could we have a specific endpoint for this?
      customFetch({
        resourceUrl: `/users?userIds=${data.userId}`,
        options: {
          method: 'GET',
        },
      }).then(friendData => {
        const newObj: Markers = {
          location: data.location,
          imgUrl: friendData.users[0].imgUrlProfileLarge,
        };
        setUserMarkers(prev => ({ ...prev, [data.userId]: newObj }));
      });
    }
  };

  /**
   * Switch statement to handle the different events.
   */
  switch (event) {
    case LocationServiceEvent.BROADCAST_LOCATION:
      if (eventData) onBroadcastLocation(eventData);
      else
        console.error(
          `[LocationService] No data sent with ${LocationServiceEvent.BROADCAST_LOCATION} event.`
        );
      break;
    default:
      break;
  }
};
