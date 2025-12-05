import { apiFetch } from '../../clients/httpClient'

export const fetchPopularMovies = async (language: string, page: number) => {
  return apiFetch(`/movie/popular`, {
    method: 'GET',
    params: {
      language,
      page: page.toString()
    }
  })
}
