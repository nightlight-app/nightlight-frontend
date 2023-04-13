import { Dimensions } from 'react-native';
import {
  LocationVisibilityValue,
  MoodEmoji,
  SelectOption,
} from '@nightlight/src/types';
import { WithSpringConfig } from 'react-native-reanimated';

// General
export const MS_PER_SECOND: number = 1000; // milliseconds in a second
export const SECONDS_PER_MINUTE: number = 60; // seconds in a minute
export const MINUTES_PER_HOUR: number = 60; // minutes in an hour
export const HOURS_PER_DAY: number = 24; // hours in a day
export const DAYS_PER_MONTH: number = 30; // days in a month (approximate)
export const MONTHS_PER_YEAR: number = 12; // number of months in a year

// Device
export const DEVICE_HEIGHT: number = Dimensions.get('window').height; // height of the device in points
export const DEVICE_WIDTH: number = Dimensions.get('window').width; // width of the device in points
export const SAFE_AREA_BOTTOM_MARGIN: number = 34; // height of the bottom margin of the safe area in points

// Navbar
export const NAVBAR_HEIGHT: number = 80; // height of the navbar in points
export const NAVBAR_WIDTH: number = 390; // width of the navbar in points

// Emergency Button
export const EMERGENCY_BUTTON_DIAMETER: number = 80; // diameter of the emergency button in points
export const EMERGENCY_BUTTON_RADIUS: number = EMERGENCY_BUTTON_DIAMETER / 2; // radius of the emergency button in points
export const COUNTDOWN_DURATION: number = 3000; // duration of the emergency countdown in milliseconds
export const EMERGENCY_TIME_THRESHOLD: number = 150; // time threshold for the emergency slider to trigger in milliseconds
export const NUM_SLIDER_ARROWS = 5;

// Mood Buttons
export const NUM_MOODS: number = Object.keys(MoodEmoji).length; // number of available moods
export const MOOD_BUTTON_DIAMETER: number = 40; // diameter of the mood button in points
export const MOOD_BUTTON_RADIUS: number = 20; // radius of the mood button in points
export const MOOD_ANGLE_RANGE_MARGIN: number = Math.PI / 6; // margin of the mood button arc in radians
export const MOOD_ANGLE: number =
  (Math.PI - MOOD_ANGLE_RANGE_MARGIN) / (NUM_MOODS - 1); // angle between each mood button in radians
export const MOODS_ARC_DIAMETER: number = 150; // diameter of the mood button arc in points
export const MOODS_ARC_RADIUS: number = MOODS_ARC_DIAMETER / 2; // radius of the mood button arc in points
export const MOOD_ARC_BOTTOM_MARGIN: number = 10; // bottom margin of the mood button arc in points
export const MOOD_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 100,
  mass: 0.75,
}; // mood button spring animation config

// Map Card
export const MAP_CARD_WIDTH = 370; // width of the map card in points

// Testing IDs for E2E testing
export const TEST_IDS = {
  SIGNIN_EMAIL_INPUT: 'SIGNIN_EMAIL_INPUT',
  SIGNIN_PASSWORD_INPUT: 'SIGNIN_PASSWORD_INPUT',
  SIGNIN_PASSWORD_VISIBILITY: 'SIGNIN_PASSWORD_VISIBILITY',
  SIGNIN_FORGOT_PASSWORD: 'SIGNIN_FORGOT_PASSWORD',
  SIGNIN_BUTTON: 'SIGNIN_BUTTON',
  SIGNUP_BUTTON: 'SIGNIN_SIGNUP_BUTTON',
};

// User Circle
export const USER_CIRCLE_DIAMETER: number = 50; // diameter of the user circle in points

// Firebase Sign In Error Codes (https://firebase.google.com/docs/auth/admin/errors)
export const SIGN_IN_ERROR_CODES: string[] = [
  'auth/invalid-email',
  'auth/wrong-password',
  'auth/user-not-found',
  'auth/internal-error',
]; // error codes to be caught when signing in

// Password Input
export const MIN_PASSWORD_LENGTH: number = 6; // minimum length of the password input

// Error Messages for Users
export const UNEXPECTED_ERROR_MESSAGE: string =
  "Well, that wasn't supposed to happen... contact us if this keeps happening (nightlight.headquarters@gmail.com).";

// Toggle button
export const TOGGLE_BUTTON_DIAMETER: number = 28; // diameter of the toggle button in points
export const TOGGLE_BUTTON_RADIUS: number = TOGGLE_BUTTON_DIAMETER / 2; // radius of the toggle button in points
export const TOGGLE_BUTTON_ANIMATION_DURATION: number = 150; // duration of the toggle button animation in milliseconds

// Horizontal select
export const HORIZONTAL_SELECT_PADDING: number = 4; // padding of the horizontal select in points

// Settings
export const LOCATION_VISIBILITY_OPTIONS: SelectOption[] = [
  { label: 'No one', value: LocationVisibilityValue.NO_ONE },
  { label: 'Friends', value: LocationVisibilityValue.FRIENDS },
  {
    label: 'Friends + Group',
    value: LocationVisibilityValue.FRIENDS_AND_GROUP,
  },
];
