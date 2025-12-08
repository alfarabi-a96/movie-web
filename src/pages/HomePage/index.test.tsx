import { HomePage } from '.'
import { render, screen } from '../../test-utils'

describe('Home Page', () => {
  it('should render home page', () => {
    render(<HomePage />)
    expect(
      screen.getByText('Your Streaming Movie Experience')
    ).toBeInTheDocument()
  })
})
