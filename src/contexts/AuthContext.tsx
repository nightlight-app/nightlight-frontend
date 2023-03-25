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
import { registerForPushNotificationsAsync } from '@nightlight/src/App';

export const AuthContext: Context<AuthContextInterface> = createContext({
  userSession: undefined,
  userDocument: undefined,
  // initialize updateUserDocument to an empty function with arbitrary params (_ is a convention for unused params)
  updateUserDocument: (_: UpdateUserDocumentInterface) => {},
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

      // fetch userDocument from mongoDB if user is logged in
      if (user)
        updateUserDocument({
          firebaseUid: user.uid as string,
          shouldUpdateNotificationToken: true,
        });
    });

    return () => unsubscribe();
  }, []);

  /**
   * Update the userDocument state.
   * Uses mongoDB id by default.
   * Optionally, pass in a firebaseUid to fetch via firebaseUid instead of mongoDB id.
   * @param firebaseUid - the firebase uid of the user
   */
  const updateUserDocument = async ({
    firebaseUid,
    shouldUpdateNotificationToken = false,
  }: UpdateUserDocumentInterface) => {
    let url = `${SERVER_URL}/users?`;

    url += firebaseUid
      ? `firebaseUid=${firebaseUid}`
      : `userId=${userDocument?._id}`;

    try {
      // fetch from mongoDB and update userDocument
      let userDocumentResponse = await fetch(url, {
        method: 'GET',
      });

      // await for the response to be parsed as json
      let userDocumentData = await userDocumentResponse.json();

      // update userDocument state
      setUserDocument(userDocumentData.user);

      if (shouldUpdateNotificationToken) {
        // get the notification token and send it to the server
        const notificationToken = await registerForPushNotificationsAsync();
        await fetch(
          `${SERVER_URL}/users/${userDocumentData.user._id}/addNotificationToken`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ notificationToken }),
          }
        );
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
