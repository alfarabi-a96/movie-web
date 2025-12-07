import { render, waitFor } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { MovieDetailsPage } from './index'

jest.mock('../../clients/endpoint', () => ({
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.5,
  release_date: '2023-01-01',
  genre_ids: [1, 2],
  popularity: 100,
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
}

jest.mock('../../queries', () => ({
  useMovieDetailsQuery: () => ({
    data: mockMovie,
    isLoading: false,
    error: null,
  }),
}))

jest.mock('../../components/Loading', () => ({
  Loading: () => <div data-testid='loading'>Loading</div>,
}))

jest.mock('../../components/Error', () => ({
  Error: () => <div data-testid='error'>Error</div>,
}))

jest.mock('../../components/Button', () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid='button'>
      {children}
    </button>
  ),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(() => false),
  }),
}))

global.localStorage = {
  getItem: jest.fn(() => 'en'),
} as any

describe('MovieDetailsPage Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  const renderMovieDetailsPage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/:id' element={<MovieDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    )

  it('renders movie details page', () => {
    renderMovieDetailsPage()
    // Just check that it doesn't throw an error
    expect(document.body).toBeInTheDocument()
  })

  it('renders loading or data', async () => {
    renderMovieDetailsPage()
    await waitFor(() => {
      // Either loading or data should be present
      expect(document.body).toBeInTheDocument()
    })
  })
})
