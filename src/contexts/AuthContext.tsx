import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { SERVER_URL } from '@env';
import {
  AuthContextInterface,
  UpdateUserDocumentInterface,
  User,
} from '@nightlight/src/types';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { registerForPushNotificationsAsync } from '@nightlight/src/service/pushNotificationService';
import { customFetch } from '@nightlight/src/api';

// Context that stores the user's Firebase session and user document from MongoDB
export const AuthContext: Context<AuthContextInterface> = createContext({
  userSession: undefined,
  userDocument: undefined,
  // initialize updateUserDocument to an empty function with arbitrary params (_ is a convention for unused params)
  updateUserDocument: (_?: UpdateUserDocumentInterface) => {},
} as AuthContextInterface);

// Hook for child components to get the auth information
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      '[AuthContext] useAuthContext must be used within a AuthProvider.'
    );

  return context;
};

// Provider component that wraps your app and makes auth object ...
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // userSession stores MongoDB ID and auth data
  const [userSession, setUserSession] = useState<
    FirebaseUser | null | undefined
  >(undefined);

  // userDocument stores user data from MongoDB
  const [userDocument, setUserDocument] = useState<User | null | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('[Firebase] Authentication state changed:', user?.uid);
      setUserSession(user);
    });

    return () => unsubscribe();
  }, []);

  // If userSession changes, update userDocument
  useEffect(() => {
    console.log('[AuthContext] userSession changed:', userSession?.uid);
    if (
      userSession &&
      // don't update userDocument if user is logging in for the first time (user document will not exist yet)
      userSession.metadata.creationTime !== userSession.metadata.lastSignInTime
    ) {
      updateUserDocument();
    } else {
      setUserDocument(undefined);
    }
  }, [userSession]);

  /**
   * Update the userDocument state by fetching the user's document from MongoDB and updating the state
   * @param shouldUpdateNotificationToken - whether to update the notification token in mongoDB (default: false)
   */
  const updateUserDocument = async ({
    shouldUpdateNotificationToken = false,
  }: UpdateUserDocumentInterface = {}) => {
    console.log('[AuthContext] Updating userDocument...');

    if (!userSession) {
      setUserDocument(undefined);
      console.log(
        '[AuthContext] No user is logged in. userDocument has been reset.',
        userSession
      );
      return;
    }

    // get the logged-in user's Firebase UID
    const firebaseUid = userSession.uid;

    try {
      // get the Firebase ID token for the user for authenticating request to backend
      const token = await userSession.getIdToken();

      // fetch from MongoDB and update userDocument
      const userDocumentResponse = await fetch(
        `${SERVER_URL}/users?firebaseUid=${firebaseUid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // await for the response to be parsed as JSON
      const userDocumentData = await userDocumentResponse.json();

      // handle error when not exactly 1 user document is returned
      if (userDocumentData.users?.length !== 1) {
        console.error(
          '[AuthContext] Expected exactly 1 user document, received:',
          userDocumentData.users
        );
        return;
      }

      const retrievedUser = userDocumentData.users[0];

      // update userDocument state to propagate changes to the rest of the app
      setUserDocument(retrievedUser);

      // if specified, update the user's notification token in MongoDB
      if (shouldUpdateNotificationToken && userSession) {
        // get the notification token and send it to the server
        const notificationToken = await registerForPushNotificationsAsync();

        if (notificationToken) {
          await customFetch({
            resourceUrl: `/users/${retrievedUser._id}/add-notification-token`,
            options: {
              method: 'PATCH',
              body: JSON.stringify({ notificationToken }),
            },
          });
        }
      }

      console.log('[AuthContext] Successfully updated userDocument!');
    } catch (error) {
      console.error('[AuthContext] Error in updateUserDocument', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userSession, userDocument, updateUserDocument }}>
      {children}
    </AuthContext.Provider>
  );
};
