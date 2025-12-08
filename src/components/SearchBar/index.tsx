import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './index.css'

export const SearchBar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  return (
    <form className='search-bar' onSubmit={handleSearch}>
      <input
        type='text'
        className='search-bar__input'
        placeholder={t('common.searchMovies')}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        aria-label='Search movies'
      />
      <button type='submit' className='search-bar__btn' aria-label='Search'>
        🔍
      </button>
    </form>
  )
}
