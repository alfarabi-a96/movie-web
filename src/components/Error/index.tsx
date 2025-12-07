import React from 'react'
import { useTranslation } from 'react-i18next'
import './index.css'

interface ErrorProps {
  message: string
  onRetry?: () => void
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  const { t } = useTranslation()

  return (
    <div className='error-container'>
      <div className='error-content'>
        <div className='error-icon'>⚠️</div>
        <h2 className='error-title'>{t('common.error')}</h2>
        <p className='error-message'>{message}</p>
        {onRetry && (
          <button className='error-retry-btn' onClick={onRetry}>
            {t('errors.tryAgain')}
          </button>
        )}
      </div>
    </div>
  )
}
