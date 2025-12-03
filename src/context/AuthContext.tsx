import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, SocialLoginData, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getStoredUsers = (): Record<string, any> => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>, password: string) => {
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const users = getStoredUsers();

    if (users[userData.email]) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users[userData.email] = {
      user: newUser,
      password: btoa(password), // Simple base64 encoding (not for production)
    };

    saveUsers(users);
  };

  const login = async (credentials: LoginCredentials) => {
    const users = getStoredUsers();

    if (!users[credentials.email]) {
      throw new Error('Email not found');
    }

    const storedData = users[credentials.email];
    const storedPassword = atob(storedData.password);

    if (storedPassword !== credentials.password) {
      throw new Error('Invalid password');
    }

    const loggedInUser = storedData.user;
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  };

  const loginWithSocial = async (
    provider: 'facebook' | 'google' | 'apple',
    data: SocialLoginData
  ) => {
    const users = getStoredUsers();
    const socialEmail = data.email || `${provider}-${data.id}@movieflix.local`;

    let newUser: User;

    if (users[socialEmail]) {
      newUser = users[socialEmail].user;
    } else {
      newUser = {
        id: data.id,
        email: socialEmail,
        name: data.name,
        avatar: data.avatar,
        loginMethod: provider,
        createdAt: new Date().toISOString(),
      };

      users[socialEmail] = {
        user: newUser,
        loginMethod: provider,
      };

      saveUsers(users);
    }

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    loginWithSocial,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
