import React from 'react'
import './index.css'

interface LoadingProps {
  fullHeight?: boolean
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({
  fullHeight = false,
  message = 'Loading...'
}) => {
  return (
    <div className={`loading ${fullHeight ? 'loading--full-height' : ''}`}>
      <div className='loading__spinner'></div>
      <p className='loading__text'>{message}</p>
    </div>
  )
}
