import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { ThemeContextType } from '../types'
import { ThemeContext } from './index'

/**
 * Props for ThemeProvider component
 */
interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider Component - Manages application-wide theme state (light/dark mode)
 *
 * Features:
 * - Toggle between light and dark theme
 * - Persists theme preference to localStorage
 * - Syncs with document.documentElement data-theme attribute
 * - CSS uses data-theme attribute for light/dark mode colors
 * - Provides ThemeContext to all child components
 *
 * @param props - ThemeProviderProps containing child components
 * @returns Provider component wrapping theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme')
    return (storedTheme as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
