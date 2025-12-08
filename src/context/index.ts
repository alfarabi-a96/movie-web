import { createContext } from 'react'
import type {
  AuthContextType,
  FavoritesContextType,
  ThemeContextType
} from '../types'

// Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

// Favorites Context
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

// Theme Context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
