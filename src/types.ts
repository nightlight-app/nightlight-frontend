import { SvgProps } from 'react-native-svg';
import { SharedValue } from 'react-native-reanimated';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

export enum TabRoute {
  MAP = 'Map',
  SOCIAL = 'Social',
  EMERGENCY_BUTTON = 'EmergencyButton',
  EXPLORE = 'Explore',
  PROFILE_STACK = 'ProfileStack',
}

export enum ProfileRoute {
  PROFILE = 'Profile',
  EMERGENCY_CONTACTS = 'EmergencyContacts',
  SETTINGS = 'Settings',
}

export enum MapCardType {
  VENUE = 'Venue',
  USER = 'User',
  CREATE_GROUP = 'CreateGroup',
  ERROR = 'Error',
}

export enum ReactionEmoji {
  FIRE = '🔥',
  WARNING = '⚠️',
  SHIELD = '🛡️',
  POOP = '💩',
  PARTY = '🎉',
}

export enum MoodEmoji {
  PARTY = '🥳',
  ANXIOUS = '😰',
  GRIMACING = '😬',
  PUKING = '🤮',
  CLEAR = '🚫',
}

export interface Reaction {
  count: number;
  didReact: boolean;
}

export interface Venue {
  _id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  reactions: {
    [key in ReactionEmoji]: Reaction; // TODO: update this to match backend
  };
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LastActive {
  location: Location;
  time: Date;
}

export interface SavedGroup {
  name: string;
  members: string[]; // mongoose ObjectId[]
}

export interface User {
  _id: string; // mongoose ObjectId
  firebaseUid: string;
  imgUrlProfileSmall?: string;
  imgUrlProfileLarge?: string;
  imgUrlCover?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  currentGroup: string; // mongoose ObjectId
  friends: string[]; // mongoose ObjectId[]
  lastActive: LastActive;
  savedGroups: SavedGroup[];
}

export interface Group {
  _id: string; // mongoose ObjectId
  name: string;
  members: string[]; // mongoose ObjectId[]
  invitedMembers: string[]; // mongoose ObjectId[]
  expectedDestination: Location;
  creationTime: Date;
  expirationTime: Date;
  returnTime: Date;
}

export interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
  style?: Object;
}

export interface NavIconProps {
  route: TabRoute;
  isFocused: boolean;
  size?: number;
  color?: string;
  focusColor?: string;
}

export interface MapCardBottomSvgProps extends ISvgProps {
  borderColor?: string;
}

export interface ButtonProps {
  onPress: () => void;
  size?: number;
  style?: Object;
}

export interface MapCardProps {
  onClose: () => void;
  children?: React.ReactNode;
  borderColor?: string;
  shadowColor?: string;
  buttonLeft?: MapCardButtonProps;
  buttonRight?: MapCardButtonProps;
}

export interface MapCardButtonProps {
  backgroundColor: string;
  borderColor: string;
  iconComponent: React.ReactNode | null;
  text: string;
  onPress: () => void;
}

export interface ExploreCardProps {
  name: string;
  address: string;
  lat: string;
  long: string;
}

export interface EmergencyContactProps {
  name: string;
  phone: string;
  isFirstItem: boolean;
  isLastItem: boolean;
}

export interface VenueCardProps extends MapCardProps {
  venue: Venue;
}

export interface UserCardProps extends MapCardProps {
  user: User;
}

export interface CreateGroupCardProps extends MapCardProps {}

export interface ErrorCardProps extends MapCardProps {
  message?: string;
}

export interface VenueReactionProps {
  emoji: string;
  value: number;
  active: boolean;
}

export interface FriendCardProps {
  name: string;
  index: number;
  isInGroup: boolean;
}

/**
 * used for querying elements when using jest test
 *
 * extracted out into an enum for easier query and readability
 *
 * note: not all testing labels live in this enum.
 * for example, Routes are also used as labels.
 */
export enum TestingLabel {
  CLOSE_BUTTON = 'CloseButton',
  USER_CARD_START_NAVIGATION = 'UserCardStartNavigation',
  USER_CARD_CALL_USER = 'UserCardCallUser',
  USER_CARD_PING_USER = 'UserCardPingUser',
  VENUE_CARD_START_NAVIGATION = 'VenueCardStartNavigation',
}

export interface EmergencyOverlayProps {
  countdown: number;
  buttonOffset: SharedValue<number>;
  maxOffset: number;
}

export interface MoodButtonProps {
  onClose: () => void;
}

export interface ProfileScreenProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Markers {
  // the title of the marker
  location: Location;
}

export interface UserMarkers extends Markers {
  // the id of the user (mongoose ObjectId)
  userId: string;
}
