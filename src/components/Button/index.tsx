import React from 'react'
import './index.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  id,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    isLoading && 'btn--loading',
    disabled && 'btn--disabled',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      id={id}
      data-testid={id}
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
