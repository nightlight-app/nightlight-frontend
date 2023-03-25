import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  UserInfo,
} from 'firebase/auth';
import { Location } from '@rnmapbox/maps/src/modules/location/locationManager';
import { Position } from '@turf/helpers/dist/js/lib/geojson';
import { COLORS } from '@nightlight/src/global.styles';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { User } from '@nightlight/src/types';
import {
  DAYS_PER_MONTH,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  MONTHS_PER_YEAR,
  MS_PER_SECOND,
  SECONDS_PER_MINUTE,
} from '@nightlight/src/constants';

// manually extract Coordinates type from Location type because it is not exported
type Coordinates = Location['coords'];

/**
 * Determine the relative time string from a given date.
 * @param {Date} date - The date to determine the relative time string from.
 * @returns {string} The relative time string.
 */
export const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / MS_PER_SECOND);
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);
  const months = Math.floor(days / DAYS_PER_MONTH); // approximately
  const years = Math.floor(months / MONTHS_PER_YEAR);

  if (years > 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
};

/**
 * Determine the color of the status indicator based on the last active time of a user.
 *  - Green if active in the last minute
 *  - Yellow if active in the last hour
 *  - Red if active more than an hour ago
 * @param {Date} lastActiveTime - The last active time of a user to determine the color from.
 * @returns {string} The color of the status indicator.
 */
export const getStatusColor = (lastActiveTime: Date): string => {
  const now = new Date();
  const seconds = Math.floor(
    (now.getTime() - lastActiveTime.getTime()) / MS_PER_SECOND
  );
  if (seconds < SECONDS_PER_MINUTE) {
    // Green if active in the last minute
    return COLORS.GREEN;
  } else if (seconds < SECONDS_PER_MINUTE * MINUTES_PER_HOUR) {
    // Yellow if active in the last hour
    return COLORS.YELLOW;
  } else {
    // Red if active more than an hour ago
    return COLORS.RED;
  }
};

/**
 * Capitalizes the first letter of the word
 */
export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Converts the MapboxGL coordinate {latitude: number, longitude: number}
 * into Position [longitude, latitude]
 */
export const convertCoordinateToPosition = (coord: Coordinates): Position => [
  coord.longitude,
  coord.latitude,
];

/**
 * Formats a phone number string. Returns null if input is less than 4 characters or if
 *
 * @param {string} phoneNumberString The phone number string to format
 * @returns {string | null} A formatted phone number string
 */
export const formatPhoneNumber = (phoneNumberString: string): string | null => {
  const cleaned = phoneNumberString.replace(/\D/g, '');

  if (cleaned.length < 4) return null;

  const match = cleaned.match(/(\d{3})(\d{1,3})?(\d{1,4})?$/);

  if (match)
    return `(${match[1]})${match[2] !== undefined ? ` ${match[2]}` : ''}${
      match[3] !== undefined ? `-${match[3]}` : ''
    }`;

  return null;
};

/**
 * Determines the text to display for a given month index on the profile calendar
 *
 * @param {number} index The index of the month (0-11)
 * @returns {string} The string 'Jan' for index 0, 'Dec' for index 11, and the index + 1 for all other indices
 */
export const getMonthText = (index: number): string => {
  switch (index) {
    case 0:
      return 'Jan';
    case 11:
      return 'Dec';
    default:
      return (index + 1).toString();
  }
};

/**
 * Sign up new user with Firebase Authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 * @returns {UserInfo['uid'] | null} The Firebase user ID of the newly created user or null if an error occurred
 */
export const handleFirebaseSignUp = async (
  email: string,
  password: string
): Promise<UserInfo['uid'] | null> => {
  console.log('[Firebase] Signing up new user...');

  try {
    const { user }: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUid: UserInfo['uid'] = user.uid;
    console.log(
      '[Firebase] Successfully signed up new user! User ID:',
      firebaseUid
    );
    return firebaseUid;
  } catch (error: unknown) {
    console.error(
      `[Firebase] Error signing up new user! Email: ${email}, password: ${password}`
    );
    console.error(error);
    return null;
  }
};

/**
 * Sign in to Firebase Authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 */
export const handleSignIn = async (email: string, password: string) => {
  console.log('[Firebase] Signing in user...');

  try {
    const { user }: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('[Firebase] Successfully signed in user! User ID:', user.uid);
  } catch (error: unknown) {
    console.log('[Firebase] Error signing in user!');
    console.error(error);
  }
};

/**
 * Remove the existing user from the Firebase application
 */
export const handleSignOut = async () => {
  console.log('[Firebase] Signing out user...');

  try {
    await signOut(auth);
    console.log('[Firebase] Successfully signed out user!');
  } catch (error: unknown) {
    console.log('[Firebase] Error signing out user!');
    console.error(error);
  }
};

/**
 * Get the number of friends from a User object
 */
export const getNumFriends = (user: User | null | undefined): number => {
  return user?.friends?.length || 0;
};

/**
 * Generate the datetime after a certain number of hours
 * @param hours - number of hours from now
 * @returns {Date} - datetime after the number of hours
 */
export const getDatetimeHoursAfter = (hours: number): Date => {
  return new Date(
    Date.now() + hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND
  );
};

/**
 * Generate a group name from a list of users (e.g. "John, Jane, and 3 others")
 * @param users - list of users
 * @returns {string} - group name
 */
export const generateGroupName = (users: User[]): string => {
  switch (users.length) {
    case 0:
      return '';
    case 1:
      return users[0].firstName;
    case 2:
      return `${users[0].firstName} and ${users[1].firstName}`;
    default:
      return `${users[0].firstName}, ${users[1].firstName}, and ${
        users.length - 2
      } others`;
  }
};
