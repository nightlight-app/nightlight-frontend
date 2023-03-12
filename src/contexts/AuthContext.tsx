import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { AuthContextInterface, User } from '@nightlight/src/types';
import { auth } from '@nightlight/src/config/firebaseConfig';
import { SERVER_URL } from '@env';

export const AuthContext: Context<AuthContextInterface> = createContext({
  userSession: undefined,
  userDocument: undefined,
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

      fetch(`${SERVER_URL}users?firebaseUid=${user?.uid}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          setUserDocument(data.user);
        });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userSession, userDocument }}>
      {children}
    </AuthContext.Provider>
  );
};
