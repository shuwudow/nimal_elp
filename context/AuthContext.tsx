// context/AuthContext.tsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { signInWithGoogle } from '../authProviders/googleAuth';
// Import other auth methods as needed

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: string | null;
  signIn: (provider: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProvider = 'google' | 'facebook' | 'apple' | 'email';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
});

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (provider: AuthProvider) => {
    setLoading(true);
    setError(null);
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'email':
          // Implement email sign-in
          break;
        default:
          throw new Error('Unsupported authentication provider');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await auth().signOut();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ user, loading, error, signIn, signOut }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};