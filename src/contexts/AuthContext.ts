import { createContext } from 'react';
import { AuthContextInterface } from '@nightlight/src/types';

const AuthContext: React.Context<AuthContextInterface> = createContext({
  user: null,
} as AuthContextInterface);

export default AuthContext;
