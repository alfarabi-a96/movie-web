import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Movie, MovieListItem, FavoritesContextType } from '../types'
import { FavoritesContext } from './index'

/**
 * Props for FavoritesProvider component
 */
interface FavoritesProviderProps {
  children: ReactNode
}

const FAVORITES_KEY = 'favorites'

const getStoredFavorites = (): Movie[] => {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children
}) => {
  const [favorites, setFavorites] = useState<Movie[]>(getStoredFavorites)

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  // handle logout
  useEffect(() => {
    const handleLogout = () => {
      setFavorites([])
    }

    window.addEventListener('userLogout', handleLogout)
    return () => {
      window.removeEventListener('userLogout', handleLogout)
    }
  }, [])

  const addFavorite = (movie: Movie | MovieListItem) => {
    setFavorites((prev) => {
      if (!prev.find((m) => m.id === movie.id)) {
        return [...prev, movie as Movie]
      }
      return prev
    })
  }

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
  }

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((m) => m.id === movieId)
  }

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
