import React, { useState } from 'react'
import type { ReactNode } from 'react'
import type {
  User,
  UserCredentials,
  AuthContextType,
  SignUpCredentials
} from '../types'
import {
  loginUser,
  loginUserByGoogle,
  signUpUser,
  updateUser
} from '../api/auth'
import { AuthContext } from './index'

/**
 * Props for AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider Component - Manages application-wide authentication state
 *
 * Features:
 * - Email/password login and registration
 * - Google OAuth authentication
 * - User profile updates
 * - User logout
 * - Persists user data to localStorage
 * - Provides AuthContext to all child components
 *
 * @param props - AuthProviderProps containing child components
 * @returns Provider component wrapping auth context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const register = async (credentials: SignUpCredentials) => {
    const { name, email, password } = credentials
    const user = await signUpUser({ email, password })
    if (user) {
      await updateUser(user, name)
    }
  }

  const login = async (credentials: UserCredentials) => {
    const { email, password, isWithGoogle } = credentials
    let user
    if (isWithGoogle) {
      user = await loginUserByGoogle()
    } else {
      user = await loginUser(email, password)
    }

    if (user) {
      const loggedInUser = {
        email: user.email,
        name: user.displayName
      }
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    // Dispatch custom event to notify other providers about logout
    window.dispatchEvent(new CustomEvent('userLogout'))
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
