import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useScrollToTop } from './hooks/useScrollToTop'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import './styles/globals.css'
import './App.css'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailPage').then(m => ({ default: m.MovieDetailsPage })))
const FavoritesPage = lazy(() => import('./pages/FavouritePage').then(m => ({ default: m.FavoritesPage })))

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollToTop()
  return (
    <>
      <Header />
      {children}
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <AppLayout>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
                <Routes>
                  {/* Auth Routes */}
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />

                  {/* Protected Routes */}
                  <Route
                    path='/home'
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/search'
                    element={
                      <ProtectedRoute>
                        <SearchPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/movie/:id'
                    element={
                      <ProtectedRoute>
                        <MovieDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/favorites'
                    element={
                      <ProtectedRoute>
                        <FavoritesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect unknown routes */}
                  <Route path='/' element={<Navigate to='/home' replace />} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </Suspense>
            </AppLayout>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
