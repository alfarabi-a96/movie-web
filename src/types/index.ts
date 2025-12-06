export type Locale = 'en' | 'id'

export interface User {
  email: string | null
  name: string | null
}

export interface UserCredentials {
  email: string
  password: string
  isWithGoogle?: boolean
}

export interface SignUpCredentials extends UserCredentials {
  name: string
}

export interface SocialLoginData {
  id: string
  name: string
  email?: string
  avatar?: string
}

export interface Movie {
  id: number
  title: string
  poster_path: string
  backdropPath?: string
  release_date: string
  overview: string
  vote_average: number
  voteCount: number
  genres: Genre[]
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  tagline?: string
  cast?: Cast[]
  crew?: Crew[]
}

export interface Genre {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profilePath?: string
  order: number
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profilePath?: string
}

export interface MovieCategory {
  id: 'popular' | 'now_playing' | 'upcoming' | 'top_rated'
  label: string
}

export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  page: number
  totalPages: number
  totalResults: number
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: UserCredentials) => Promise<void>
  register: (credential: SignUpCredentials) => Promise<void>
  logout: () => void
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

export interface LocaleConfig {
  language: Record<Locale, string>
  region: Record<Locale, string>
}
