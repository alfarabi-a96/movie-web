import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Movie } from '../types'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/components/MovieCard.css'
import { IMAGE_BASE_URL } from '../clients/endpoint'

interface MovieCardProps {
  movie: Movie
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
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className='movie-card__image'
          loading='lazy'
        />
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
            {movie.vote_average.toFixed(1)}
          </span>
          <span className='movie-card__rating-max'>/10</span>
        </div>
      </div>
      <div className='movie-card__content'>
        <h3 className='movie-card__title'>{movie.title}</h3>
        <p className='movie-card__year'>
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  )
}
