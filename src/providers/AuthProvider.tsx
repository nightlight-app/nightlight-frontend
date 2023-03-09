import React, { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@nightlight/src/config/firebaseConfig';
import AuthContext from '@nightlight/src/contexts/AuthContext';
import { ProviderProps } from '@nightlight/src/types';

const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
