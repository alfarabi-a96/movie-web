import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './index'

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input placeholder='Enter text' />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('updates value on change', async () => {
    const handleChange = jest.fn()
    render(<Input placeholder='Test' onChange={handleChange} />)
    const input = screen.getByPlaceholderText('Test')
    await userEvent.type(input, 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('accepts type prop', () => {
    render(<Input type='email' placeholder='Email' />)
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement
    expect(input.type).toBe('email')
  })

  it('accepts value prop', () => {
    render(<Input value='test value' placeholder='Test' onChange={jest.fn()} />)
    const input = screen.getByPlaceholderText('Test') as HTMLInputElement
    expect(input.value).toBe('test value')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder='Test' />)
    expect(screen.getByPlaceholderText('Test')).toBeDisabled()
  })

  it('has correct class names', () => {
    const { container } = render(<Input placeholder='Test' />)
    expect(container.querySelector('.input')).toBeInTheDocument()
  })
})
