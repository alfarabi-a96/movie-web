import React, { useId } from 'react'
import './index.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  id,
  type = 'text',
  className,
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || generatedId

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
        className={`${error ? 'input--error' : 'input'} ${className || ''}`}
        {...props}
      />
      {error && <span className='input-error'>{error}</span>}
    </div>
  )
}
