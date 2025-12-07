import { render, screen } from '@testing-library/react'
import { Error } from './index'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}))

describe('Error Component', () => {
  it('renders error component', () => {
    render(<Error message='Something went wrong' />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<Error message='Failed to load data' />)
    expect(screen.getByText('Failed to load data')).toBeInTheDocument()
  })

  it('renders error icon', () => {
    const { container } = render(<Error message='Error' />)
    expect(container.querySelector('.error-icon')).toBeInTheDocument()
  })

  it('displays error in container', () => {
    const { container } = render(<Error message='Test error' />)
    const errorContainer = container.querySelector('.error-container')
    expect(errorContainer).toBeInTheDocument()
  })
})
