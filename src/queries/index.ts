import { useAppInfiniteQuery } from './hooks'
import { fetchPopularMovies } from '../api/tmdb'

export const usePopularMoviesInfiniteQuery = (language: string) => {
  const languageData = {
    en: 'en-US',
    id: 'id-ID'
  }

  return useAppInfiniteQuery({
    queryKey: ['popular-movies-infinite', language],
    queryFn: (context) =>
      fetchPopularMovies(
        languageData[language as keyof typeof languageData],
        context.pageParam as number
      ),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1
  })
}
