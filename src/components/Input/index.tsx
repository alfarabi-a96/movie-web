import React from 'react'
import './index.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  id,
  type = 'text',
  className,
  ...props
}) => {
  const inputId = id || `input-${Math.random()}`

  return (
    <div
      className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''}`}
    >
      {label && (
        <label htmlFor={inputId} className='input-label'>
          {label}
          {props.required && <span className='input-required'>*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input ${error ? 'input--error' : ''} ${className || ''}`}
        {...props}
      />
      {error && <span className='input-error'>{error}</span>}
      {helperText && !error && (
        <span className='input-helper'>{helperText}</span>
      )}
    </div>
  )
}
