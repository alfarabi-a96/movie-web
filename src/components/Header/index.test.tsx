import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { Header } from './index'

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'John Doe', email: 'john@example.com' },
    logout: jest.fn(),
  }),
}))

jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: jest.fn() },
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

describe('Header Component', () => {
  it('renders header', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(container.querySelector('.header')).toBeInTheDocument()
  })

  it('renders logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByText('common.appName')).toBeInTheDocument()
  })

  it('renders navigation links when user is logged in', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByText('common.home')).toBeInTheDocument()
    expect(screen.getByText('common.favorites')).toBeInTheDocument()
  })

  it('renders language selector with EN and ID buttons', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const languageButtons = screen.getAllByRole('button')
    const enButton = languageButtons.find(btn => btn.textContent?.includes('EN'))
    const idButton = languageButtons.find(btn => btn.textContent?.includes('ID'))
    expect(enButton).toBeInTheDocument()
    expect(idButton).toBeInTheDocument()
  })

  it('renders user menu button', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('shows logout option when user menu is clicked', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const userButton = screen.getByRole('button', { name: /user menu/i })
    await userEvent.click(userButton)
    expect(screen.getByText('common.logout')).toBeInTheDocument()
  })
})
