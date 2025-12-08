import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFavorites } from '../../hooks/useFavorites'
import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import type { Locale, Movie, CastMember, CrewMember } from '../../types'
import { useMoviewDetailsQuery } from '../../queries'
import { IMAGE_BASE_URL } from '../../clients/endpoint'
import './index.css'

const formatCurrency = (value: number): string => {
  return `$${(value / 1000000).toFixed(1)}M`
}

const getReleaseYear = (releaseDate: string): number => {
  return new Date(releaseDate).getFullYear()
}

const getGenresList = (genres: Movie['genres']): string => {
  return genres.map((genre) => genre.name).join(', ')
}

const getUniqueCrew = (crew: CrewMember[]): CrewMember[] => {
  return crew.filter(
    (item, index, self) => index === self.findIndex((c) => c.id === item.id)
  )
}

const ActorAvatar: React.FC<{ actor: CastMember }> = ({ actor }) => {
  if (!actor.profile_path) {
    return (
      <div className='movie-details__cast-placeholder'>
        {actor.name.charAt(0).toUpperCase()}
      </div>
    )
  }
  return (
    <img src={`${IMAGE_BASE_URL}/w185${actor.profile_path}`} alt={actor.name} />
  )
}

const CastSection: React.FC<{
  cast: CastMember[]
  t: ReturnType<typeof useTranslation>['t']
}> = ({ cast, t }) => {
  if (!cast || cast.length === 0) return null

  return (
    <div className='movie-details__section'>
      <h2 className='movie-details__section-title'>{t('movies.cast')}</h2>
      <div className='movie-details__cast'>
        {cast.slice(0, 5).map((actor: CastMember) => (
          <div key={actor.cast_id} className='movie-details__cast-item'>
            <div className='movie-details__cast-avatar'>
              <ActorAvatar actor={actor} />
            </div>
            <div className='movie-details__cast-info'>
              <p className='movie-details__cast-name'>{actor.name}</p>
              <p className='movie-details__cast-role'>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CrewSection: React.FC<{
  crew: CrewMember[]
  t: ReturnType<typeof useTranslation>['t']
}> = ({ crew, t }) => {
  const uniqueCrew = useMemo(() => getUniqueCrew(crew), [crew])

  if (uniqueCrew.length === 0) return null

  return (
    <div className='movie-details__section'>
      <h2 className='movie-details__section-title'>{t('movies.crew')}</h2>
      <div className='movie-details__crew'>
        {uniqueCrew.slice(0, 4).map((member: CrewMember) => (
          <div key={member.id} className='movie-details__crew-item'>
            <p className='movie-details__crew-name'>{member.name}</p>
            <p className='movie-details__crew-role'>{member.job}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const DetailsGrid: React.FC<{
  movie: Movie
  t: ReturnType<typeof useTranslation>['t']
}> = ({ movie, t }) => {
  const details = useMemo(
    () =>
      [
        movie.budget && {
          label: t('movies.budget'),
          value: formatCurrency(movie.budget)
        },
        movie.revenue && {
          label: t('movies.revenue'),
          value: formatCurrency(movie.revenue)
        },
        movie.status && {
          label: t('movies.status'),
          value: movie.status
        },
        {
          label: t('movies.releaseDate'),
          value: movie.release_date
            ? new Date(movie.release_date).toLocaleDateString()
            : 'N/A'
        }
      ].filter(Boolean) as Array<{ label: string; value: string }>,
    [movie, t]
  )

  return (
    <div className='movie-details__grid'>
      {details.map((detail, index) => (
        <div key={index} className='movie-details__grid-item'>
          <h3>{detail?.label}</h3>
          <p>{detail?.value}</p>
        </div>
      ))}
    </div>
  )
}

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const language = (localStorage.getItem('language') ?? 'en') as Locale
  const {
    data: movieDetails,
    isLoading,
    error
  } = useMoviewDetailsQuery(id as string, language)

  const releaseYear = useMemo(
    () =>
      movieDetails?.release_date
        ? getReleaseYear(movieDetails.release_date)
        : 'N/A',
    [movieDetails]
  )

  const genresList = useMemo(
    () => (movieDetails ? getGenresList(movieDetails.genres) : ''),
    [movieDetails]
  )

  const ratings = useMemo(
    () =>
      movieDetails?.vote_average
        ? `${movieDetails.vote_average.toFixed(1)}/10`
        : 'N/A',
    [movieDetails]
  )

  const favorite = movieDetails ? isFavorite(movieDetails.id) : false

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!movieDetails) return

    if (favorite) {
      removeFavorite(movieDetails.id)
    } else {
      addFavorite(movieDetails)
    }
  }

  if (isLoading) {
    return <Loading fullHeight message={t('common.loading')} />
  }

  if (error || !movieDetails) {
    return <Error message={t('errors.notFound')} />
  }

  return (
    <div className='movie-details'>
      {/* Backdrop */}

      <div className='movie-details__backdrop'>
        {movieDetails.backdrop_path && (
          <img
            src={`${IMAGE_BASE_URL}/w780${movieDetails.backdrop_path}`}
            alt={movieDetails.original_title}
            className='movie-details__backdrop-image'
          />
        )}

        <div className='movie-details__backdrop-overlay'></div>
      </div>

      {/* Content */}
      <div className='container'>
        <div className='movie-details__content'>
          {/* Poster */}
          <div className='movie-details__poster'>
            {movieDetails.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}/w185${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            )}
          </div>

          {/* Info */}
          <div className='movie-details__info'>
            <div className='movie-details__header'>
              <h1 className='movie-details__title'>{movieDetails.title}</h1>
              <div className='movie-details__meta'>
                <span className='movie-details__year'>{releaseYear}</span>
                <span className='movie-details__rating'>⭐ {ratings}</span>
                {movieDetails.runtime && (
                  <span className='movie-details__runtime'>
                    ⏱ {movieDetails.runtime} {t('movies.minutes')}
                  </span>
                )}
              </div>
            </div>

            {movieDetails.tagline && (
              <p className='movie-details__tagline'>"{movieDetails.tagline}"</p>
            )}

            {genresList && (
              <div className='movie-details__genres'>{genresList}</div>
            )}

            {/* Buttons */}
            <div className='movie-details__actions'>
              <Button
                id='favorite-button'
                variant={favorite ? 'danger' : 'primary'}
                onClick={handleFavoriteToggle}
                fullWidth
              >
                {favorite
                  ? t('movies.removeFromFavorites')
                  : t('movies.addToFavorites')}
              </Button>
              <Button
                id='back-button'
                variant='secondary'
                onClick={() => navigate(-1)}
              >
                {t('common.back')}
              </Button>
            </div>

            {/* Synopsis */}
            <div className='movie-details__section'>
              <h2 className='movie-details__section-title'>
                {t('movies.overview')}
              </h2>
              <p className='movie-details__description'>
                {movieDetails.overview}
              </p>
            </div>

            {/* Details Grid */}
            <DetailsGrid movie={movieDetails} t={t} />

            {/* Cast */}
            {movieDetails.credits && (
              <CastSection cast={movieDetails.credits.cast} t={t} />
            )}

            {/* Crew */}
            {movieDetails.credits && (
              <CrewSection crew={movieDetails.credits.crew} t={t} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
