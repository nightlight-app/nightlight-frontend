import { SvgProps } from 'react-native-svg';
import {
  EntryExitAnimationFunction,
  SharedValue,
} from 'react-native-reanimated';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import type { User as FirebaseUser } from 'firebase/auth';
import { NativeStackNavigationEventMap } from '@react-navigation/native-stack';

// TODO: Organize these types into separate files (probably in /src/interfaces?)

export enum TabRoute {
  MAP = 'Map',
  SOCIAL_STACK = 'SocialStack',
  EMERGENCY_BUTTON = 'EmergencyButton',
  EXPLORE = 'Explore',
  PROFILE_STACK = 'ProfileStack',
}

export enum AuthRoute {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
}

export enum ProfileRoute {
  PROFILE = 'Profile',
  EMERGENCY_CONTACTS = 'EmergencyContacts',
  SETTINGS = 'Settings',
}

export enum SocialRoute {
  SOCIAL = 'Social',
  FRIEND_SEARCH = 'FriendSearch',
  NOTIFICATIONS = 'Notifications',
}

export enum MapCardType {
  VENUE = 'Venue',
  USER = 'User',
  CREATE_GROUP = 'CreateGroup',
  MANAGE_GROUP = 'ManageGroup',
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

export enum SignUpInputField {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  CONFIRM_PASSWORD = 'Confirm Password',
  PHONE_NUMBER = 'Phone Number',
}

export enum ExploreSortFilter {
  ALL = 'All',
  TRENDING = 'Trending',
}

export enum LocationVisibilityValue {
  NO_ONE = 'NoOne',
  FRIENDS = 'Friends',
  FRIENDS_AND_GROUP = 'FriendsAndGroup',
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
  time: string;
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
  currentGroup?: string; // mongoose ObjectId
  invitedGroups?: string[]; // mongoose ObjectId[]
  friends: string[]; // mongoose ObjectId[]
  friendRequests?: string[]; // mongoose ObjectId[]
  lastActive: LastActive;
  savedGroups?: SavedGroup[];
  isActiveNow: boolean;
}

export interface Group {
  _id?: string; // mongoose ObjectId
  name: string;
  members: string[]; // mongoose ObjectId[]
  invitedMembers: string[]; // mongoose ObjectId[]
  expectedDestination?: Location;
  creationDatetime: Date;
  expirationDatetime: Date;
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
  icon?: React.ReactNode;
  text?: string;
  textColor?: string;
}

export interface MapCardProps {
  onClose: () => void;
  onError?: () => void;
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
  userId: string;
}

export interface CreateGroupCardProps extends MapCardProps {}

export interface ManageGroupCardProps extends MapCardProps {
  onGroupMemberPress: (userId: string) => void;
}

export interface ErrorCardProps extends MapCardProps {
  message?: string;
}

export interface FriendCardProps {
  name: string;
  index: number;
  isInGroup: boolean;
  imgUrl: string;
}

export interface NotificationCardProps {
  index: number;
  message: string;
  userId: string;
}

export interface SearchUserCardProps {
  firstName: string;
  lastName: string;
  index: number;
  isAdded: boolean;
  isFirstItem: boolean;
  isLastItem: boolean;
  image: string;
  friendId: string;
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

export interface BottomTabScreenProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

export interface NativeStackScreenProps {
  navigation: NavigationHelpers<ParamListBase, NativeStackNavigationEventMap>;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Markers {
  // the title of the marker
  location: Location;
  // the image to query for the marker
  imgUrl: string;
}

export interface UserMarkerMap {
  [key: string]: Markers;
}

export interface AuthContextInterface {
  userSession: FirebaseUser | null | undefined;
  userDocument: User | null | undefined;
  updateUserDocument: (
    user: FirebaseUser | null,
    shouldUpdateNotificationToken?: boolean
  ) => void;
}

export interface BannerProps {
  message: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface NightlightMapProps {
  onUserMarkerPress: (userId: string) => void;
  onError?: () => void;
}

export interface UserCircleProps {
  userId: string;
}

export interface MoodButtonAnimation {
  entry: EntryExitAnimationFunction;
  exit: EntryExitAnimationFunction;
}

export interface ToggleButtonProps {
  value: boolean | undefined;
  toggleValue: () => void;
}

export interface ToggleSettingProps extends ToggleButtonProps {
  label: string;
  description?: string;
  dangerous?: boolean;
}
export interface VenueReactButtonProps {
  venue: Venue;
  reaction: ReactionEmoji;
  resetError?: () => void;
  onError?: () => void;
}

export interface ExploreCardProps {
  venue: Venue;
  resetError: () => void;
  onError: () => void;
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  options: SelectOption[];
  value: any;
  onChangeValue: (value: any) => void;
}

export interface DisplayedGroupMember {
  userId: string;
  isInvited: boolean;
}
