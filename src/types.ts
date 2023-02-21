import { SvgProps } from 'react-native-svg';
import { SharedValue } from 'react-native-reanimated';

export enum Route {
  MAP = 'Map',
  SOCIAL = 'Social',
  EMERGENCY = 'Emergency',
  EXPLORE = 'Explore',
  PROFILE = 'Profile',
}

export enum MapCardType {
  VENUE = 'venue',
  USER = 'user',
  ERROR = 'error',
}

export enum ReactionEmoji {
  FIRE = '🔥',
  WARNING = '⚠️',
  SHIELD = '🛡️',
  POOP = '💩',
  PARTY = '🎉',
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
    [key in ReactionEmoji]: Reaction;
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

// TODO: Add more fields
export interface User {
  _id: string;
  imgUrlProfileSmall?: string;
  firstName: string;
  lastName: string;
  lastActive: LastActive;
  phoneNumber: string;
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

export interface CloseButtonProps {
  onPress: () => void;
  size?: number;
  style?: Object;
}

export interface MapCardProps {
  onClose: () => void;
  children?: React.ReactNode;
  borderColor?: string;
  shadowColor?: string;
}

export interface VenueCardProps extends MapCardProps {
  venue: Venue;
}

export interface UserCardProps extends MapCardProps {
  user: User;
}

export interface ErrorCardProps extends MapCardProps {
  message?: string;
}

export interface EmergencyOverlayProps {
  countdown: number;
  buttonOffset: SharedValue<number>;
  maxOffset: number;
}
