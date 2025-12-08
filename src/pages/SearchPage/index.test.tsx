import { SearchPage } from '.'
import { render, screen } from '../../test-utils'

describe('Search Page', () => {
  it('should render search page', () => {
    render(<SearchPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
