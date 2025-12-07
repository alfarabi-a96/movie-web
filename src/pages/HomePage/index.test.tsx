import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { HomePage } from './index'

jest.mock('../../components/MovieCarousel', () => ({
  MovieCarousel: () => <div data-testid='movie-carousel'>Carousel</div>,
}))

jest.mock('../../components/SearchBar', () => ({
  SearchBar: () => <div data-testid='search-bar'>Search Bar</div>,
}))

jest.mock('../../components/Loading', () => ({
  Loading: () => <div data-testid='loading'>Loading</div>,
}))

jest.mock('../../components/Error', () => ({
  Error: () => <div data-testid='error'>Error</div>,
}))

jest.mock('../../queries', () => ({
  usePopularMoviesInfiniteQuery: () => ({
    data: { pages: [[{ id: 1, title: 'Movie' }]], pageParams: [1] },
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
  }),
  useNowPlayingMoviesInfiniteQuery: () => ({
    data: { pages: [], pageParams: [] },
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
  }),
  useUpcomingMoviesInfiniteQuery: () => ({
    data: { pages: [], pageParams: [] },
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
  }),
  useTopRatedMoviesInfiniteQuery: () => ({
    data: { pages: [], pageParams: [] },
    isLoading: false,
    error: null,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
  }),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

global.localStorage = {
  getItem: jest.fn(() => 'en'),
} as any

describe('HomePage Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  const renderHomePage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </QueryClientProvider>
    )

  it('renders home page', () => {
    renderHomePage()
    const homePage = document.querySelector('.home-page')
    expect(homePage).toBeInTheDocument()
  })

  it('renders hero section with title', () => {
    renderHomePage()
    const title = screen.getByText('common.appName')
    expect(title).toBeInTheDocument()
  })

  it('renders search bar in hero section', () => {
    renderHomePage()
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('renders movie carousels', () => {
    renderHomePage()
    const carousels = screen.getAllByTestId('movie-carousel')
    expect(carousels.length).toBeGreaterThan(0)
  })
})
