import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import type { Movie } from '../types';
import '../styles/pages/Home.css';

interface MovieSection {
  id: string;
  label: string;
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState<Record<string, MovieSection>>({
    popular: {
      id: 'popular',
      label: t('movies.popular'),
      movies: [],
      isLoading: true,
      error: null,
    },
    nowPlaying: {
      id: 'now_playing',
      label: t('movies.nowPlaying'),
      movies: [],
      isLoading: true,
      error: null,
    },
    upcoming: {
      id: 'upcoming',
      label: t('movies.upcoming'),
      movies: [],
      isLoading: true,
      error: null,
    },
    topRated: {
      id: 'top_rated',
      label: t('movies.topRated'),
      movies: [],
      isLoading: true,
      error: null,
    },
  });

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popular, nowPlaying, upcoming, topRated] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getNowPlayingMovies(),
          movieService.getUpcomingMovies(),
          movieService.getTopRatedMovies(),
        ]);

        setSections({
          popular: {
            ...sections.popular,
            movies: popular,
            isLoading: false,
          },
          nowPlaying: {
            ...sections.nowPlaying,
            movies: nowPlaying,
            isLoading: false,
          },
          upcoming: {
            ...sections.upcoming,
            movies: upcoming,
            isLoading: false,
          },
          topRated: {
            ...sections.topRated,
            movies: topRated,
            isLoading: false,
          },
        });
      } catch (err) {
        const error = err as Error;
        const errorMsg = error.message || t('errors.loadingError');
        setSections((prev) => ({
          popular: { ...prev.popular, error: errorMsg, isLoading: false },
          nowPlaying: { ...prev.nowPlaying, error: errorMsg, isLoading: false },
          upcoming: { ...prev.upcoming, error: errorMsg, isLoading: false },
          topRated: { ...prev.topRated, error: errorMsg, isLoading: false },
        }));
      }
    };

    loadMovies();
  }, [t]);

  const handleRetry = (sectionId: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], isLoading: true, error: null },
    }));

    const loadSectionMovies = async () => {
      try {
        let movies: Movie[] = [];
        if (sectionId === 'popular') movies = await movieService.getPopularMovies();
        else if (sectionId === 'nowPlaying') movies = await movieService.getNowPlayingMovies();
        else if (sectionId === 'upcoming') movies = await movieService.getUpcomingMovies();
        else if (sectionId === 'topRated') movies = await movieService.getTopRatedMovies();

        setSections((prev) => ({
          ...prev,
          [sectionId]: { ...prev[sectionId], movies, isLoading: false },
        }));
      } catch (err) {
        const error = err as Error;
        const errorMsg = error.message || t('errors.loadingError');
        setSections((prev) => ({
          ...prev,
          [sectionId]: { ...prev[sectionId], error: errorMsg, isLoading: false },
        }));
      }
    };

    loadSectionMovies();
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">{t('common.appName')}</h1>
          <p className="home-hero__subtitle">{t('common.appTagline')}</p>
        </div>
      </div>

      <div className="container">
        {Object.values(sections).map((section) => (
          <section key={section.id} className="movie-section">
            <h2 className="movie-section__title">{section.label}</h2>

            {section.isLoading && <Loading message={t('common.loading')} />}

            {section.error && (
              <Error
                message={section.error}
                onRetry={() => handleRetry(section.id)}
              />
            )}

            {!section.isLoading && !section.error && section.movies.length > 0 && (
              <div className="movie-grid">
                {section.movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}

            {!section.isLoading && !section.error && section.movies.length === 0 && (
              <p className="movie-section__empty">{t('movies.noResults')}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
