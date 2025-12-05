import type { Movie, Genre, Cast, Crew } from '../types'

// Mock data generators
const genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
]

const mockCast: Cast[] = [
  {
    id: 1,
    name: 'Leonardo DiCaprio',
    character: 'Lead Actor',
    profilePath: '',
    order: 1
  },
  {
    id: 2,
    name: 'Emma Watson',
    character: 'Female Lead',
    profilePath: '',
    order: 2
  },
  {
    id: 3,
    name: 'Tom Hanks',
    character: 'Supporting Actor',
    profilePath: '',
    order: 3
  },
  {
    id: 4,
    name: 'Scarlett Johansson',
    character: 'Supporting Actress',
    profilePath: '',
    order: 4
  }
]

const mockCrew: Crew[] = [
  {
    id: 1,
    name: 'Steven Spielberg',
    job: 'Director',
    department: 'Directing',
    profilePath: ''
  },
  {
    id: 2,
    name: 'Hans Zimmer',
    job: 'Original Music Composer',
    department: 'Sound',
    profilePath: ''
  },
  {
    id: 3,
    name: 'Roger Deakins',
    job: 'Director of Photography',
    department: 'Camera',
    profilePath: ''
  }
]

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    posterPath: 'https://via.placeholder.com/300x450?text=Shawshank',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Shawshank',
    releaseDate: '1994-10-14',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    voteCount: 2500000,
    genres: [genres[6], genres[17]], // Drama, War
    runtime: 142,
    budget: 25000000,
    revenue: 58300000,
    status: 'Released',
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 2,
    title: 'The Dark Knight',
    posterPath: 'https://via.placeholder.com/300x450?text=DarkKnight',
    backdropPath: 'https://via.placeholder.com/1280x720?text=DarkKnight',
    releaseDate: '2008-07-18',
    overview:
      'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on Gotham City.',
    rating: 9.0,
    voteCount: 2000000,
    genres: [genres[0], genres[14], genres[17]], // Action, Sci-Fi, Thriller
    runtime: 152,
    budget: 185000000,
    revenue: 1000000000,
    status: 'Released',
    tagline: 'Welcome to a world without rules.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 3,
    title: 'Inception',
    posterPath: 'https://via.placeholder.com/300x450?text=Inception',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Inception',
    releaseDate: '2010-07-16',
    overview:
      'A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    rating: 8.8,
    voteCount: 2400000,
    genres: [genres[0], genres[14], genres[8]], // Action, Sci-Fi, Fantasy
    runtime: 148,
    budget: 160000000,
    revenue: 839000000,
    status: 'Released',
    tagline: 'Your mind is the scene of the crime.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 4,
    title: 'The Godfather',
    posterPath: 'https://via.placeholder.com/300x450?text=Godfather',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Godfather',
    releaseDate: '1972-03-24',
    overview:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his youngest and reluctant son.',
    rating: 9.2,
    voteCount: 1800000,
    genres: [genres[6], genres[4]], // Drama, Crime
    runtime: 175,
    budget: 6000000,
    revenue: 250000000,
    status: 'Released',
    tagline: "An offer you can't refuse.",
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    posterPath: 'https://via.placeholder.com/300x450?text=PulpFiction',
    backdropPath: 'https://via.placeholder.com/1280x720?text=PulpFiction',
    releaseDate: '1994-10-14',
    overview:
      'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    rating: 8.9,
    voteCount: 1900000,
    genres: [genres[4], genres[17]], // Crime, Thriller
    runtime: 154,
    budget: 8000000,
    revenue: 213000000,
    status: 'Released',
    tagline:
      'Just Because You Are a Character Does Not Mean You Have Character.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 6,
    title: 'Forrest Gump',
    posterPath: 'https://via.placeholder.com/300x450?text=ForrestGump',
    backdropPath: 'https://via.placeholder.com/1280x720?text=ForrestGump',
    releaseDate: '1994-07-06',
    overview:
      'The presidencies of Kennedy and Johnson unfold from the perspective of an Alabama man with an IQ of 75.',
    rating: 8.8,
    voteCount: 1900000,
    genres: [genres[6], genres[9]], // Drama, History
    runtime: 142,
    budget: 55000000,
    revenue: 678000000,
    status: 'Released',
    tagline: 'Life is like a box of chocolates.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 7,
    title: 'The Matrix',
    posterPath: 'https://via.placeholder.com/300x450?text=Matrix',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Matrix',
    releaseDate: '1999-03-31',
    overview:
      'A hacker is contacted by mysterious rebels who reveal to him that he is living in a simulated reality called the Matrix.',
    rating: 8.7,
    voteCount: 1800000,
    genres: [genres[0], genres[14]], // Action, Sci-Fi
    runtime: 136,
    budget: 63000000,
    revenue: 467000000,
    status: 'Released',
    tagline: 'Welcome to the Real World.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 8,
    title: 'Avatar',
    posterPath: 'https://via.placeholder.com/300x450?text=Avatar',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Avatar',
    releaseDate: '2009-12-18',
    overview:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.',
    rating: 7.8,
    voteCount: 1500000,
    genres: [genres[0], genres[1], genres[14]], // Action, Adventure, Sci-Fi
    runtime: 162,
    budget: 237000000,
    revenue: 2923000000,
    status: 'Released',
    tagline: 'Enter the World.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 9,
    title: 'Interstellar',
    posterPath: 'https://via.placeholder.com/300x450?text=Interstellar',
    backdropPath: 'https://via.placeholder.com/1280x720?text=Interstellar',
    releaseDate: '2014-11-07',
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    voteCount: 1700000,
    genres: [genres[6], genres[14]], // Drama, Sci-Fi
    runtime: 169,
    budget: 165000000,
    revenue: 731000000,
    status: 'Released',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    cast: mockCast,
    crew: mockCrew
  },
  {
    id: 10,
    title: 'The Lion King',
    posterPath: 'https://via.placeholder.com/300x450?text=LionKing',
    backdropPath: 'https://via.placeholder.com/1280x720?text=LionKing',
    releaseDate: '1994-06-12',
    overview:
      'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    rating: 8.5,
    voteCount: 1200000,
    genres: [genres[2], genres[7]], // Animation, Family
    runtime: 88,
    budget: 45000000,
    revenue: 770000000,
    status: 'Released',
    tagline: 'The Circle of Life',
    cast: mockCast,
    crew: mockCrew
  }
]

export const movieService = {
  getPopularMovies: async (): Promise<Movie[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMovies.slice(0, 8)
  },

  getNowPlayingMovies: async (): Promise<Movie[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMovies.slice(1, 9)
  },

  getUpcomingMovies: async (): Promise<Movie[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMovies.slice(2, 10)
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMovies.sort((a, b) => b.rating - a.rating)
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const lowerQuery = query.toLowerCase()
    return mockMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.overview.toLowerCase().includes(lowerQuery)
    )
  },

  getMovieById: async (id: number): Promise<Movie | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMovies.find((movie) => movie.id === id) || null
  },

  getAllMovies: (): Movie[] => {
    return mockMovies
  }
}
