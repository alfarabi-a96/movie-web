import React from 'react'
import { useTranslation } from 'react-i18next'
import { MovieCarousel } from '../../components/MovieCarousel'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import { usePopularMoviesInfiniteQuery } from '../../queries'
import './index.css'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const language = localStorage.getItem('language') ?? 'en'
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = usePopularMoviesInfiniteQuery(language)

  // Flatten all pages into single array
  const allMovies = data?.pages.flatMap((page: any) => page.results) ?? []

  return (
    <div className='home-page'>
      <div className='home-hero'>
        <div className='home-hero__content'>
          <h1 className='home-hero__title'>{t('common.appName')}</h1>
          <p className='home-hero__subtitle'>{t('common.appTagline')}</p>
        </div>
      </div>

      <div className='container'>
        {isLoading && <Loading message={t('common.loading')} />}

        {error != null && <Error message={t('errors.loadingError')} />}

        {!isLoading && !error && allMovies.length > 0 && (
          <MovieCarousel
            movies={allMovies}
            title={t('movies.popular')}
            onLoadMore={() => hasNextPage && fetchNextPage()}
            isLoading={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  )
}
