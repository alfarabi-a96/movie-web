import { render, screen } from '../../test-utils'
import { MovieDetailsPage } from '.'

describe('MovieDetailPage', () => {
  it('should render loading state initially', () => {
    render(<MovieDetailsPage />, {
      initialEntries: ['/movie/550']
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
