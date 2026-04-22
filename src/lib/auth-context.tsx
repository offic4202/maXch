'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Profile } from './types';
import * as store from './store';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = () => {
    if (user) {
      const p = store.getProfileByUserId(user.id);
      setProfile(p);
    }
  };

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(currentUser);
    if (currentUser) {
      const p = store.getProfileByUserId(currentUser.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(p);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const loggedInUser = store.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      const p = store.getProfileByUserId(loggedInUser.id);
      setProfile(p);
      return true;
    }
    return false;
  };

  const logout = () => {
    store.logout();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}