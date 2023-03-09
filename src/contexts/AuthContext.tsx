import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { AuthContextInterface } from '@nightlight/src/types';
import { auth } from '@nightlight/src/config/firebaseConfig';

export const AuthContext: Context<AuthContextInterface> = createContext({
  user: undefined,
} as AuthContextInterface);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<FirebaseUser | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user ? user : undefined);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
