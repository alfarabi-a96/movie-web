import { render, screen } from '@testing-library/react'
import { Loading } from './index'

describe('Loading Component', () => {
  it('renders loading component', () => {
    render(<Loading message='Loading...' />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<Loading message='Please wait' />)
    expect(screen.getByText('Please wait')).toBeInTheDocument()
  })

  it('renders loading spinner', () => {
    const { container } = render(<Loading message='Loading' />)
    expect(container.querySelector('.loading')).toBeInTheDocument()
  })

  it('renders fullHeight when prop is true', () => {
    const { container } = render(<Loading message='Loading' fullHeight />)
    expect(container.querySelector('.loading--full-height')).toBeInTheDocument()
  })
})
