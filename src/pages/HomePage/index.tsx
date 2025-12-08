import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MovieCarousel } from '../../components/MovieCarousel'
import { SearchBar } from '../../components/SearchBar'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import type { Locale, PaginatedMoviesResponse } from '../../types'
import {
  usePopularMoviesInfiniteQuery,
  useNowPlayingMoviesInfiniteQuery,
  useUpcomingMoviesInfiniteQuery,
  useTopRatedMoviesInfiniteQuery
} from '../../queries'
import './index.css'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const language = localStorage.getItem('language') ?? 'en'

  // Popular movies - fetch immediately
  const popularQuery = usePopularMoviesInfiniteQuery(language as Locale)

  // Lazy loaded sections
  const [shouldFetchNowPlaying, setShouldFetchNowPlaying] = useState(false)
  const [shouldFetchUpcoming, setShouldFetchUpcoming] = useState(false)
  const [shouldFetchTopRated, setShouldFetchTopRated] = useState(false)

  const nowPlayingQuery = useNowPlayingMoviesInfiniteQuery(
    language as Locale,
    shouldFetchNowPlaying
  )
  const upcomingQuery = useUpcomingMoviesInfiniteQuery(
    language as Locale,
    shouldFetchUpcoming
  )
  const topRatedQuery = useTopRatedMoviesInfiniteQuery(
    language as Locale,
    shouldFetchTopRated
  )

  // Refs for lazy loading
  const nowPlayingRef = useRef<HTMLDivElement>(null)
  const upcomingRef = useRef<HTMLDivElement>(null)
  const topRatedRef = useRef<HTMLDivElement>(null)

  // Sections configuration
  const lazySections = [
    {
      ref: nowPlayingRef,
      setShouldFetch: setShouldFetchNowPlaying,
      query: nowPlayingQuery,
      title: t('movies.nowPlaying')
    },
    {
      ref: upcomingRef,
      setShouldFetch: setShouldFetchUpcoming,
      query: upcomingQuery,
      title: t('movies.upcoming')
    },
    {
      ref: topRatedRef,
      setShouldFetch: setShouldFetchTopRated,
      query: topRatedQuery,
      title: t('movies.topRated')
    }
  ]

  // Intersection Observer untuk lazy load semua sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = lazySections.find(
              (s) => s.ref.current === entry.target
            )
            if (section) {
              section.setShouldFetch(true)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    lazySections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Flatten popular movies
  const allPopularMovies =
    popularQuery.data?.pages.flatMap(
      (page: PaginatedMoviesResponse) => page.results
    ) ?? []

  return (
    <div className='home-page'>
      <div className='home-hero'>
        <div className='home-hero__content'>
          <h1 className='home-hero__title'>{t('common.appName')}</h1>
          <p className='home-hero__subtitle'>{t('common.appTagline')}</p>
          <div className='home-hero__search'>
            <SearchBar />
          </div>
        </div>
      </div>

      <div className='container'>
        {/* Popular Movies */}
        {popularQuery.isLoading && <Loading message={t('common.loading')} />}

        {popularQuery.error != null && (
          <Error message={t('errors.loadingError')} />
        )}

        {!popularQuery.isLoading &&
          !popularQuery.error &&
          allPopularMovies.length > 0 && (
            <MovieCarousel
              movies={allPopularMovies}
              title={t('movies.popular')}
              onLoadMore={() =>
                popularQuery.hasNextPage && popularQuery.fetchNextPage()
              }
              isLoading={popularQuery.isFetchingNextPage}
            />
          )}

        {/* Lazy loaded sections */}
        {lazySections.map((section, index) => {
          const allMovies =
            section.query.data?.pages.flatMap(
              (page: PaginatedMoviesResponse) => page.results
            ) ?? []
          const shouldShow =
            (index === 0 && shouldFetchNowPlaying) ||
            (index === 1 && shouldFetchUpcoming) ||
            (index === 2 && shouldFetchTopRated)

          return (
            <div
              key={section.title}
              ref={section.ref}
              className='list-movie-container'
            >
              {shouldShow && (
                <>
                  {section.query.isLoading && (
                    <Loading message={t('common.loading')} />
                  )}

                  {section.query.error != null && (
                    <Error message={t('errors.loadingError')} />
                  )}

                  {!section.query.isLoading &&
                    !section.query.error &&
                    allMovies.length > 0 && (
                      <MovieCarousel
                        movies={allMovies}
                        title={section.title}
                        onLoadMore={() =>
                          section.query.hasNextPage &&
                          section.query.fetchNextPage()
                        }
                        isLoading={section.query.isFetchingNextPage}
                      />
                    )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
