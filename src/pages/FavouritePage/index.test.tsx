import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { FavoritesPage } from './index'

const mockMovie = {
  id: 1,
  title: 'Favorite Movie',
  overview: 'Test Overview',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.5,
  release_date: '2023-01-01',
  popularity: 100,
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
}

jest.mock('../../components/MovieCard', () => ({
  MovieCard: ({ movie }: any) => (
    <div data-testid='movie-card' data-movie-id={movie.id}>
      {movie.title}
    </div>
  ),
}))

jest.mock('../../components/Error', () => ({
  Error: ({ message }: any) => (
    <div data-testid='error'>{message || 'Error'}</div>
  ),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [mockMovie],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(() => true),
  }),
}))

global.localStorage = {
  getItem: jest.fn(() => 'en'),
} as any

describe('FavouritePage Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  const renderFavouritePage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FavoritesPage />
        </BrowserRouter>
      </QueryClientProvider>
    )

  it('renders favourite page', () => {
    renderFavouritePage()
    const favouritePage = document.querySelector('.favorites-page')
    expect(favouritePage).toBeInTheDocument()
  })

  it('renders favourite movies', () => {
    renderFavouritePage()
    expect(screen.getByTestId('movie-card')).toBeInTheDocument()
  })

  it('renders page title', () => {
    renderFavouritePage()
    const title = screen.getByText('favorites.title')
    expect(title).toBeInTheDocument()
  })

  it('displays movie count', () => {
    renderFavouritePage()
    const movies = screen.getAllByTestId('movie-card')
    expect(movies.length).toBe(1)
  })
})
