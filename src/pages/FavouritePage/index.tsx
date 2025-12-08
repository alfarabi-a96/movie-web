import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFavorites } from '../../hooks/useFavorites'
import { MovieCard } from '../../components/MovieCard'
import './index.css'
import Icon from '../../components/Icon'

export const FavoritesPage: React.FC = () => {
  const { t } = useTranslation()
  const { favorites } = useFavorites()

  return (
    <div className='favorites-page'>
      <div className='container'>
        <div className='favorites-header'>
          <h1 className='favorites-title'>{t('favorites.title')}</h1>
          <p className='favorites-count'>
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className='movie-grid'>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className='favorites-empty'>
            <Icon name='love' color='red' size='60' />
            <h2 className='favorites-empty__title'>{t('favorites.empty')}</h2>
          </div>
        )}
      </div>
    </div>
  )
}
