import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { movieService } from '../services/movieService'
import { MovieCard } from '../components/MovieCard'
import { Loading } from '../components/Loading'
import { Error } from '../components/Error'
import { Input } from '../components/Input'
import type { Movie } from '../types'
import '../styles/pages/Search.css'

export const SearchPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    if (!query) {
      setMovies([])
      return
    }

    const search = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const results = await movieService.searchMovies(query)
        setMovies(results)
      } catch (err) {
        const error = err as Error
        setError(error.message || t('errors.loadingError'))
      } finally {
        setIsLoading(false)
      }
    }

    search()
  }, [query, t])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() })
    }
  }

  return (
    <div className='search-page'>
      <div className='search-hero'>
        <div className='container'>
          <h1 className='search-hero__title'>{t('search.searchTitle')}</h1>
          <form onSubmit={handleSearch} className='search-form'>
            <Input
              type='text'
              placeholder={t('search.placeholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className='search-form__input'
            />
          </form>
        </div>
      </div>

      <div className='container'>
        <section className='search-results'>
          {query && (
            <h2 className='search-results__subtitle'>
              {t('movies.searchResults')}: "{query}"
            </h2>
          )}

          {isLoading && <Loading message={t('common.loading')} />}

          {error && <Error message={error} />}

          {!isLoading && !error && movies.length > 0 && (
            <div className='movie-grid'>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {!isLoading && !error && query && movies.length === 0 && (
            <div className='search-results__empty'>
              <p className='search-results__empty-icon'>🔍</p>
              <h3 className='search-results__empty-title'>
                {t('search.noMoviesFound')}
              </h3>
              <p className='search-results__empty-text'>
                {t('search.tryDifferentKeyword')}
              </p>
            </div>
          )}

          {!query && (
            <div className='search-results__empty'>
              <p className='search-results__empty-icon'>🎬</p>
              <h3 className='search-results__empty-title'>
                {t('search.placeholder')}
              </h3>
              <p className='search-results__empty-text'>
                {t('search.searchTitle')}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
