import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MovieCard } from './index'
import type { Movie } from '../../types'
import { FavoritesProvider } from '../../context/FavoritesContext'

jest.mock('../../clients/endpoint', () => ({
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w342',
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Test overview',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genres: [],
  original_language: 'en',
  original_title: 'Test Movie',
  video: false,
  budget: 0,
  revenue: 0,
  status: 'Released',
  origin_country: ['US'],
  runtime: 120,
  production_companies: [],
  production_countries: [],
  spoken_languages: [],
}

describe('MovieCard Component', () => {
  const renderMovieCard = (movie = mockMovie) =>
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <MovieCard movie={movie} />
        </FavoritesProvider>
      </BrowserRouter>
    )

  it('renders movie card with title', () => {
    renderMovieCard()
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('renders movie poster image', () => {
    renderMovieCard()
    const image = screen.getByAltText('Test Movie')
    expect(image).toBeInTheDocument()
  })

  it('displays vote average rating', () => {
    renderMovieCard()
    expect(screen.getByText('8.5')).toBeInTheDocument()
    expect(screen.getByText('/10')).toBeInTheDocument()
  })

  it('is clickable and navigates to details page', () => {
    renderMovieCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/movie/1')
  })

  it('renders movie card container with correct class', () => {
    const { container } = renderMovieCard()
    expect(container.querySelector('.movie-card')).toBeInTheDocument()
  })
})
