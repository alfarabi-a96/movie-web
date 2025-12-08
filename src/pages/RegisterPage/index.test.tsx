import { RegisterPage } from '.'
import { render, screen } from '../../test-utils'

describe('Register Page', () => {
  it('should render register page', () => {
    render(<RegisterPage />)
    expect(screen.getByTestId('register-button')).toBeInTheDocument()
  })
})
