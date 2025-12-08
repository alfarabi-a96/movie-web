import { render, screen } from '../../test-utils'
import { LoginPage } from '.'

describe('Login Page', () => {
  it('should render login page', () => {
    render(<LoginPage />)
    expect(screen.getByTestId('login-button')).toBeInTheDocument()
  })
})
