import { SvgProps } from 'react-native-svg';

export enum Route {
  MAP = 'Map',
  SOCIAL = 'Social',
  EXPLORE = 'Explore',
  PROFILE = 'Profile',
}

export interface Venue {
  _id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// TODO:
export interface User {
  _id: string;
  imgUrlProfileSmall?: string;
  firstName: string;
  lastName: string;
  lastActive: {
    location: {
      longitude: number;
      latitude: number;
    };
    time: Date;
  };
  phoneNumber: string;
}

export interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
  style?: Object;
}

export interface MapCardBottomSvgProps extends ISvgProps {
  borderColor?: string;
}

export interface MapCardProps {
  children?: React.ReactNode;
  borderColor: string;
  onClose: () => void;
}

export interface CloseButtonProps {
  onPress: () => void;
  size?: number;
  style?: Object;
}

export interface VenueCardProps {
  venue: Venue;
  onClose: () => void;
}

export interface UserCardProps {
  user: User;
  onClose: () => void;
}
