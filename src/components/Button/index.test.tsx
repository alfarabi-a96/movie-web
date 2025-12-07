import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './index'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('renders with primary variant by default', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn--primary')
  })

  it('renders with secondary variant', () => {
    render(<Button variant='secondary'>Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--secondary')
  })

  it('renders with danger variant', () => {
    render(<Button variant='danger'>Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--danger')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders fullWidth when prop is true', () => {
    render(<Button fullWidth>Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--full-width')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Test</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders children correctly', () => {
    render(
      <Button>
        <span>Child content</span>
      </Button>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })
})
