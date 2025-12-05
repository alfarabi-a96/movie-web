import React, { createContext, useContext, useState } from 'react'
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

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
    localStorage.removeItem('currentUser')
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
