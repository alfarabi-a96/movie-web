import { useAppInfiniteQuery, useAppQuery } from './hooks'
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieById,
  searchMovies
} from '../api/tmdb'
import { LOCALE } from '../constants'
import type { Locale, PaginatedMoviesResponse } from '../types'

// Generic hook for movie infinite queries
const useMoviesInfiniteQuery = (
  queryKey: string,
  fetchFn: (
    language: string,
    page: number,
    query: string
  ) => Promise<PaginatedMoviesResponse>,
  language: Locale,
  enabled: boolean = true,
  query = ''
) => {
  const initialPage = 1
  const fullQueryKey = [queryKey, language, query]
  const getNextPageParam = (lastPage: {
    page: number
    total_pages: number
  }) => {
    return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
  }

  const queryFn = ({ pageParam }: { pageParam: unknown }) =>
    fetchFn(
      LOCALE[language],
      pageParam as number,
      query
    )

  return useAppInfiniteQuery(
    fullQueryKey,
    queryFn,
    getNextPageParam,
    initialPage,
    enabled
  )
}

export const useMoviewDetailsQuery = (movieId: string, language: Locale) => {
  const queryKey = ['movie-details', movieId, language]
  const queryFn = () => fetchMovieById(movieId, LOCALE[language])
  return useAppQuery(queryKey, queryFn)
}

export const usePopularMoviesInfiniteQuery = (language: Locale) => {
  return useMoviesInfiniteQuery(
    'popular-movies-infinite',
    fetchPopularMovies,
    language
  )
}

export const useNowPlayingMoviesInfiniteQuery = (
  language: Locale,
  enabled: boolean
) => {
  return useMoviesInfiniteQuery(
    'now-playing-movies-infinite',
    fetchNowPlayingMovies,
    language,
    enabled
  )
}

export const useUpcomingMoviesInfiniteQuery = (
  language: Locale,
  enabled: boolean
) => {
  return useMoviesInfiniteQuery(
    'upcoming-movies-infinite',
    fetchUpcomingMovies,
    language,
    enabled
  )
}

export const useTopRatedMoviesInfiniteQuery = (
  language: Locale,
  enabled: boolean
) => {
  return useMoviesInfiniteQuery(
    'top-rated-movies-infinite',
    fetchTopRatedMovies,
    language,
    enabled
  )
}

export const useSearchMoviesInfiniteQuery = (
  query: string,
  language: Locale
) => {
  return useMoviesInfiniteQuery(
    `search-movies-infinite-${query}`,
    searchMovies,
    language,
    true,
    query
  )
}
