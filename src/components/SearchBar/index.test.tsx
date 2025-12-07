import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'common.search') return 'Search'
      return key
    },
  }),
}))

describe('SearchBar Component', () => {
  it('renders search input', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    expect(screen.getByLabelText('Search movies')).toBeInTheDocument()
  })

  it('renders search button', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('updates input value on change', async () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    const input = screen.getByLabelText('Search movies') as HTMLInputElement
    await userEvent.type(input, 'Avatar')
    expect(input.value).toBe('Avatar')
  })

  it('has correct CSS classes', () => {
    const { container } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    expect(container.querySelector('.search-bar')).toBeInTheDocument()
  })
})
