export type Locale = 'en' | 'id'

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface BelongsToCollection {
  id: number
  name: string
  poster_path?: string
  backdrop_path?: string
}

export interface Movie {
  adult: boolean
  backdrop_path?: string
  belongs_to_collection?: BelongsToCollection
  budget: number
  genres: Genre[]
  homepage?: string
  id: number
  imdb_id?: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime?: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline?: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits?: Credits
}

export interface PaginatedMoviesResponse {
  results: Omit<
    Movie,
    | 'credits'
    | 'production_companies'
    | 'production_countries'
    | 'spoken_languages'
  >[]
  page: number
  total_pages: number
  total_results: number
}

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

export interface MovieCredits {
  cast: Cast[]
  crew: Crew[]
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
