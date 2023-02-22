import firebase from 'firebase';
import {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_APPID,
  FIREBASE_MEASUREMENTID,
} from '@env';

// Configuration constants
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

// Check if firebase app exists before creating new instance
if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

/**
 * Sign up new user with firebase authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 *
 * @returns object that contains a user authentication token as well as other related information
 */
export const handleSignUp = async (email: string, password: string) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(firebase.auth().currentUser);
    })
    .catch((error: Error) => {
      console.log('Error signing up new user!');
      console.error(error);
    });
};

/**
 * Login to firebase authentication using email and password.
 *
 * @param email valid string email address
 * @param password valid password for user account
 *
 * @returns object that contains a user authentication token as well as other related information
 */
export const handleLogin = async (email: string, password: string) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log(firebase.auth().currentUser);
    })
    .catch((error: Error) => {
      console.log('Error logging in user!');
      console.error(error);
    });
};

/**
 * Remove the existing user from the firebase application
 */
export const handleSignOut = async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      console.log(firebase.auth().currentUser);
    })
    .catch((error: Error) => {
      console.log('Error signing out user!');
      console.error(error);
    });
};
