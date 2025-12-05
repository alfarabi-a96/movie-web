// User and Authentication Types
export interface User {
  email: string | null;
  name: string | null;
}

export interface UserCredentials {
  email: string;
  password: string;
  isWithGoogle?: boolean;
}

export interface SignUpCredentials extends UserCredentials {
  name: string;
}

export interface SocialLoginData {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// Movie Types
export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath?: string;
  releaseDate: string;
  overview: string;
  rating: number;
  voteCount: number;
  genres: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
  cast?: Cast[];
  crew?: Crew[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath?: string;
}

export interface MovieCategory {
  id: 'popular' | 'now_playing' | 'upcoming' | 'top_rated';
  label: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

// Auth Context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (credential: SignUpCredentials) => Promise<void>;
  logout: () => void;
}

// Theme Context
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Favorites Context
export interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}
