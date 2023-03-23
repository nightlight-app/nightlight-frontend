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

export const AuthContext: Context<AuthContextInterface> = createContext({
  userSession: undefined,
  userDocument: undefined,
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
      if (user) updateUserDocument({ firebaseUid: user.uid as string });
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
  }: UpdateUserDocumentInterface) => {
    let url = `${SERVER_URL}/users?`;

    url += firebaseUid
      ? `firebaseUid=${firebaseUid}`
      : `userId=${userDocument?._id}`;

    // fetch from mongoDB and update userDocument
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(`[MongoDB] ${data.message} ${data.user._id}`);
        setUserDocument(data.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ userSession, userDocument, updateUserDocument }}>
      {children}
    </AuthContext.Provider>
  );
};
