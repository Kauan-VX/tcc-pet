'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type UserType = 'adopter' | 'institution' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  avatar?: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    userType: UserType,
  ) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    userType: UserType,
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('adota-match-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('adota-match-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: UserType,
  ): Promise<boolean> => {
    setLoading(true);

    // Simulate API call - replace with real authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      type: userType,
      verified: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(mockUser);
    localStorage.setItem('adota-match-user', JSON.stringify(mockUser));
    setLoading(false);
    return true;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    userType: UserType,
  ): Promise<boolean> => {
    setLoading(true);

    // Simulate API call - replace with real authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful registration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      type: userType,
      verified: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(mockUser);
    localStorage.setItem('adota-match-user', JSON.stringify(mockUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adota-match-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
