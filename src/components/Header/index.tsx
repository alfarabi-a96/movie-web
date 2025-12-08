import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './index.css'

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowUserMenu(false)
  }

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__logo'>
          <span className='header__logo-icon'>🎬</span>
          <span className='header__logo-text'>{t('common.appName')}</span>
        </Link>

        <nav className='header__nav'>
          {user && (
            <>
              <Link to='/' className='header__link'>
                {t('common.home')}
              </Link>
              <Link to='/favorites' className='header__link'>
                {t('common.favorites')}
              </Link>
            </>
          )}
        </nav>

        <div className='header__actions'>
          {/* Language Selector */}
          <div className='header__language-selector'>
            <button
              className={`header__language-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
              title='English'
            >
              EN
            </button>
            <button
              className={`header__language-btn ${i18n.language === 'id' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('id')}
              title='Indonesia'
            >
              ID
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            className='header__theme-btn'
            onClick={toggleTheme}
            title={
              theme === 'light' ? t('common.darkMode') : t('common.lightMode')
            }
            aria-label='Toggle theme'
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* User Menu */}
          {user ? (
            <div className='header__user-menu'>
              <button
                className='header__user-btn'
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label='User menu'
              >
                <span className='header__user-avatar'>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
                <span className='header__user-name'>{user.name}</span>
              </button>

              {showUserMenu && (
                <div className='header__dropdown'>
                  <button
                    className='header__dropdown-item'
                    onClick={handleLogout}
                  >
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        {user && (
          <button
            className='header__mobile-menu-btn'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label='Toggle mobile menu'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && user && (
          <nav className='header__mobile-menu'>
            <Link
              to='/'
              className='header__mobile-link'
              onClick={() => setShowMobileMenu(false)}
            >
              {t('common.home')}
            </Link>
            <Link
              to='/favorites'
              className='header__mobile-link'
              onClick={() => setShowMobileMenu(false)}
            >
              {t('common.favorites')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
