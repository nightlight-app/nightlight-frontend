import { SvgProps } from 'react-native-svg';
import { SharedValue } from 'react-native-reanimated';

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export enum Route {
  MAP = 'Map',
  SOCIAL = 'Social',
  EMERGENCY = 'Emergency',
  EXPLORE = 'Explore',
  PROFILE = 'Profile',
  LOGIN = 'Login',
  REGISTER = 'Register',
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
  route: Route;
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

// TODO: refactor this to be more generic
export interface LoginCardProps {
  setIsLogin: (value: boolean) => void;
}

export interface RegisterCardProps {
  setIsLogin: (value: boolean) => void;
}

export interface VenueReactionProps {
  emoji: string;
  value: number;
  active: boolean;
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
