import { FavoritesPage } from '.'
import { render, screen } from '../../test-utils'

describe('Favourite Page', () => {
  it('should render favourite page', () => {
    render(<FavoritesPage />)
    expect(screen.getByText('My Favorites')).toBeInTheDocument()
  })
})
