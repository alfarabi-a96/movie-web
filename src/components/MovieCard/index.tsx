import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Movie, MovieListItem } from '../../types'
import { useFavorites } from '../../context/FavoritesContext'
import { IMAGE_BASE_URL } from '../../clients/endpoint'
import './index.css'

interface MovieCardProps {
  movie: Movie | MovieListItem
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { t } = useTranslation()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Link to={`/movie/${movie.id}`} className='movie-card'>
      <div className='movie-card__poster'>
        {movie.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}/w185${movie.poster_path}`}
            alt={movie.title}
            className='movie-card__image'
            loading='lazy'
          />
        )}
        <button
          className={`movie-card__favorite-btn ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          title={
            favorite
              ? t('movies.removeFromFavorites')
              : t('movies.addToFavorites')
          }
          aria-label={
            favorite
              ? t('movies.removeFromFavorites')
              : t('movies.addToFavorites')
          }
        >
          ♥
        </button>
        <div className='movie-card__rating'>
          <span className='movie-card__rating-value'>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
          {movie.vote_average !== 0 && (
            <span className='movie-card__rating-max'>/10</span>
          )}
        </div>
      </div>
      <div className='movie-card__content'>
        <h3 className='movie-card__title'>{movie.title}</h3>
        {movie.release_date && (
          <p className='movie-card__year'>
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  )
}
