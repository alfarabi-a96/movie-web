import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { movieService } from '../../services/movieService'
import { useFavorites } from '../../context/FavoritesContext'
import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import type { Movie } from '../../types'
import './index.css'

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) {
        setError(t('errors.notFound'))
        return
      }

      setIsLoading(true)
      try {
        const data = await movieService.getMovieById(parseInt(id, 10))
        if (!data) {
          setError(t('errors.notFound'))
        } else {
          setMovie(data)
        }
      } catch (err) {
        const error = err as Error
        setError(error.message || t('errors.loadingError'))
      } finally {
        setIsLoading(false)
      }
    }

    loadMovie()
  }, [id, t])

  const handleFavoriteToggle = () => {
    if (!movie) return

    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  if (isLoading) {
    return <Loading fullHeight message={t('common.loading')} />
  }

  if (error || !movie) {
    return <Error message={error || t('errors.notFound')} />
  }

  const releaseYear = new Date(movie.releaseDate).getFullYear()
  const genresList = movie.genres.map((g) => g.name).join(', ')
  const favorite = isFavorite(movie.id)

  return (
    <div className='movie-details'>
      {/* Backdrop */}
      <div className='movie-details__backdrop'>
        <img
          src={movie.backdropPath}
          alt={movie.title}
          className='movie-details__backdrop-image'
        />
        <div className='movie-details__backdrop-overlay'></div>
      </div>

      {/* Content */}
      <div className='container'>
        <div className='movie-details__content'>
          {/* Poster */}
          <div className='movie-details__poster'>
            <img src={movie.posterPath} alt={movie.title} />
          </div>

          {/* Info */}
          <div className='movie-details__info'>
            <div className='movie-details__header'>
              <h1 className='movie-details__title'>{movie.title}</h1>
              <div className='movie-details__meta'>
                <span className='movie-details__year'>{releaseYear}</span>
                <span className='movie-details__rating'>
                  ⭐ {movie.rating.toFixed(1)}/10
                </span>
                {movie.runtime && (
                  <span className='movie-details__runtime'>
                    ⏱ {movie.runtime} {t('movies.minutes')}
                  </span>
                )}
              </div>
            </div>

            {movie.tagline && (
              <p className='movie-details__tagline'>"{movie.tagline}"</p>
            )}

            <div className='movie-details__genres'>{genresList}</div>

            {/* Buttons */}
            <div className='movie-details__actions'>
              <Button
                variant={favorite ? 'danger' : 'primary'}
                onClick={handleFavoriteToggle}
                fullWidth
              >
                {favorite
                  ? t('movies.removeFromFavorites')
                  : t('movies.addToFavorites')}
              </Button>
              <Button variant='secondary' onClick={() => navigate(-1)}>
                {t('common.back')}
              </Button>
            </div>

            {/* Synopsis */}
            <div className='movie-details__section'>
              <h2 className='movie-details__section-title'>
                {t('movies.overview')}
              </h2>
              <p className='movie-details__description'>{movie.overview}</p>
            </div>

            {/* Details Grid */}
            <div className='movie-details__grid'>
              {movie.budget && (
                <div className='movie-details__grid-item'>
                  <h3>{t('movies.budget')}</h3>
                  <p>${(movie.budget / 1000000).toFixed(1)}M</p>
                </div>
              )}
              {movie.revenue && (
                <div className='movie-details__grid-item'>
                  <h3>{t('movies.revenue')}</h3>
                  <p>${(movie.revenue / 1000000).toFixed(1)}M</p>
                </div>
              )}
              {movie.status && (
                <div className='movie-details__grid-item'>
                  <h3>{t('movies.status')}</h3>
                  <p>{movie.status}</p>
                </div>
              )}
              <div className='movie-details__grid-item'>
                <h3>{t('movies.releaseDate')}</h3>
                <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div className='movie-details__section'>
                <h2 className='movie-details__section-title'>
                  {t('movies.cast')}
                </h2>
                <div className='movie-details__cast'>
                  {movie.cast.map((actor) => (
                    <div key={actor.id} className='movie-details__cast-item'>
                      <div className='movie-details__cast-avatar'>
                        {actor.profilePath ? (
                          <img src={actor.profilePath} alt={actor.name} />
                        ) : (
                          <div className='movie-details__cast-placeholder'>
                            {actor.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className='movie-details__cast-info'>
                        <p className='movie-details__cast-name'>{actor.name}</p>
                        <p className='movie-details__cast-role'>
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crew */}
            {movie.crew && movie.crew.length > 0 && (
              <div className='movie-details__section'>
                <h2 className='movie-details__section-title'>
                  {t('movies.crew')}
                </h2>
                <div className='movie-details__crew'>
                  {movie.crew.map((member) => (
                    <div key={member.id} className='movie-details__crew-item'>
                      <p className='movie-details__crew-name'>{member.name}</p>
                      <p className='movie-details__crew-role'>{member.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
