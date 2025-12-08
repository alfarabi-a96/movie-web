import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MovieCard } from '../../components/MovieCard'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import { Input } from '../../components/Input'
import { useSearchMoviesInfiniteQuery } from '../../queries'
import type { Locale, PaginatedMoviesResponse } from '../../types'
import './index.css'

export const SearchPage: React.FC = () => {
  const { t } = useTranslation()
  const language = localStorage.getItem('language') ?? 'en'
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const observerTarget = useRef<HTMLDivElement>(null)

  const {
    data: searchQueryData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useSearchMoviesInfiniteQuery(query, language as Locale)

  const allSearchMovies =
    searchQueryData?.pages.flatMap(
      (page: PaginatedMoviesResponse) => page.results
    ) || []

  // Lazy loading dengan IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1
      }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])
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

          {isError && <Error message={t('errors.loadingError')} />}

          {!isLoading && !isError && allSearchMovies.length > 0 && (
            <>
              <div className='movie-grid'>
                {allSearchMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              {/* Lazy load observer target */}
              <div ref={observerTarget} className='search-results__loader'>
                {isFetchingNextPage && (
                  <Loading message={t('common.loading')} />
                )}
              </div>
            </>
          )}

          {!isLoading && !isError && query && allSearchMovies.length === 0 && (
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
