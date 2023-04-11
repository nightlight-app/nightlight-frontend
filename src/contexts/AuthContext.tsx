import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  AuthContextInterface,
  UpdateUserDocumentInterface,
  User,
} from '@nightlight/src/types';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { SERVER_URL } from '@env';
import { registerForPushNotificationsAsync } from '@nightlight/src/service/pushNotificationService';
import { customFetch } from '@nightlight/src/api';

export const AuthContext: Context<AuthContextInterface> = createContext({
  userSession: undefined,
  userDocument: undefined,
  // initialize updateUserDocument to an empty function with arbitrary params (_ is a convention for unused params)
  updateUserDocument: (_?: UpdateUserDocumentInterface) => {},
} as AuthContextInterface);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // userSession stores mongoDB id and auth data
  const [userSession, setUserSession] = useState<
    FirebaseUser | null | undefined
  >(undefined);

  // userDocument stores user data from mongoDB
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
    if (userSession) {
      updateUserDocument({
        shouldUpdateNotificationToken: true,
      });
    }
  }, [userSession]);

  /**
   * Helper method for getting the user's firebase token
   */
  const getUserFirebaseToken = async () => {
    if (!userSession) {
      console.log(
        '[AuthContext] getUserFirebaseToken called but no userSession available'
      );
      return;
    }
    return await userSession.getIdToken();
  };

  /**
   * Helper method for getting the user's firebase uid
   */
  const getUserFirebaseUid = async () => {
    if (!userSession) {
      console.log(
        '[AuthContext] getUserFirebaseUid called but no userSession available'
      );
      return;
    }
    return await userSession.uid;
  };

  /**
   * Update the userDocument state by fetching the user's document from mongoDB and updating the state
   * @param shouldUpdateNotificationToken - whether to update the notification token in mongoDB (default: false)
   */
  const updateUserDocument = async ({
    shouldUpdateNotificationToken = false,
  }: UpdateUserDocumentInterface = {}) => {
    const firebaseUid = await getUserFirebaseUid();
    const url = `${SERVER_URL}/users?firebaseUid=${firebaseUid}`;

    try {
      const token = await getUserFirebaseToken();

      // fetch from mongoDB and update userDocument
      const userDocumentResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // await for the response to be parsed as json
      const userDocumentData = await userDocumentResponse.json();

      // handle error
      if (userDocumentData.users.length !== 1) {
        console.log(
          '[AuthContext] Expect 1 user document, got: ',
          userDocumentData.users
        );
        return;
      }

      const retrievedUser = userDocumentData.users[0];

      // update userDocument state to propagate changes to the rest of the app
      setUserDocument(retrievedUser);

      if (shouldUpdateNotificationToken && userSession) {
        // get the notification token and send it to the server
        const notificationToken = await registerForPushNotificationsAsync();

        if (notificationToken) {
          await customFetch({
            resourceUrl: `/users/${retrievedUser._id}/addNotificationToken`,
            options: {
              method: 'PATCH',
              body: JSON.stringify({ notificationToken }),
            },
          });
        }
      }
    } catch (e) {
      console.log('Error in updateUserDocument', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userSession, userDocument, updateUserDocument }}>
      {children}
    </AuthContext.Provider>
  );
};
