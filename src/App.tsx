import React from 'react'
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
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { MovieDetailsPage } from './pages/MovieDetailsPage'
import { FavoritesPage } from './pages/FavoritesPage'
import './styles/globals.css'
import './App.css'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
            </AppLayout>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
