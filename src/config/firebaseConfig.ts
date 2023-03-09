import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

// Our web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Sign up new user with Firebase Authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 *
 * @returns object that contains a user authentication token as well as other related information
 */
export const handleSignUp = async (email: string, password: string) => {
  console.log('[Firebase] Signing up new user...');

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log('[Firebase] Successfully signed up new user!', user);
  } catch (error: unknown) {
    console.log('[Firebase] Error signing up new user!');
    console.error(error);
  }
};

/**
 * Login to Firebase Authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 *
 * @returns object that contains a user authentication token as well as other related information
 */
export const handleLogin = async (email: string, password: string) => {
  console.log('[Firebase] Logging in user...');

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log('[Firebase] Successfully logged in user!', user);
  } catch (error: unknown) {
    console.log('[Firebase] Error logging in user!');
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
