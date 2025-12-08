import { createContext } from 'react'
import type {
  AuthContextType,
  FavoritesContextType,
  ThemeContextType
} from '../types'

/**
 * AuthContext - Manages user authentication state
 *
 * Contains:
 * - user: Currently logged-in user object or null
 * - isAuthenticated: Boolean flag for authentication status
 * - login(): Function to authenticate user with email/password or Google OAuth
 * - register(): Function to create new user account
 * - logout(): Function to sign out and clear session
 *
 * Used in: AuthProvider component
 * Accessed via: useAuth() hook
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * FavoritesContext - Manages user's collection of favorite movies
 *
 * Contains:
 * - favorites: Array of Movie objects marked as favorites
 * - addFavorite(): Function to add movie to favorites
 * - removeFavorite(): Function to remove movie from favorites
 * - isFavorite(): Function to check if movie is in favorites
 *
 * Persists to: localStorage (key: 'favorites')
 * Used in: FavoritesProvider component
 * Accessed via: useFavorites() hook
 */
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

/**
 * ThemeContext - Manages application theme (light/dark mode)
 *
 * Contains:
 * - theme: Current theme ('light' or 'dark')
 * - toggleTheme(): Function to switch between light and dark mode
 *
 * Persists to: localStorage (key: 'theme')
 * Syncs with: document.documentElement data-theme attribute
 * Used in: ThemeProvider component
 * Accessed via: useTheme() hook
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
