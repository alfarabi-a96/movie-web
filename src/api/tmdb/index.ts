import { apiFetch } from '../../clients/httpClient'

export const fetchMovieById = async (movieId: string, language: string) => {
  return apiFetch(`/movie/${movieId}`, {
    method: 'GET',
    params: {
      language
    }
  })
}

export const fetchPopularMovies = async (
  language: string,
  page: number,
  region: string
) => {
  return apiFetch(`/movie/popular`, {
    method: 'GET',
    params: {
      language,
      page: page.toString(),
      region
    }
  })
}

export const fetchNowPlayingMovies = async (
  language: string,
  page: number,
  region: string
) => {
  return apiFetch(`/movie/now_playing`, {
    method: 'GET',
    params: {
      language,
      region,
      page: page.toString()
    }
  })
}

export const fetchUpcomingMovies = async (
  language: string,
  page: number,
  region: string
) => {
  return apiFetch(`/movie/upcoming`, {
    method: 'GET',
    params: {
      language,
      region,
      page: page.toString()
    }
  })
}

export const fetchTopRatedMovies = async (
  language: string,
  page: number,
  region: string
) => {
  return apiFetch(`/movie/top_rated`, {
    method: 'GET',
    params: {
      language,
      page: page.toString(),
      region,
      ['vote_count.gte']: '1000'
    }
  })
}
