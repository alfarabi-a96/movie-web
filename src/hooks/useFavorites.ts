import { useContext } from 'react'
import { FavoritesContext } from '../context'
import type { FavoritesContextType } from '../types'

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}
