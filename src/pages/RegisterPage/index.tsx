import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { useInput } from '../../hooks/useInput'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import {
  EMAIL_REGEX,
  INVALID_EMAIL_FORMAT,
  MAX_LENGTH_ERROR,
  MISMATCH_ERROR,
  REQUIRED_ERROR,
  SERVER_ERROR
} from '../../constants'
import '../../pages/LoginPage/index.css'

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, bind, validate, reset } = useInput({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const errorMessage = useMemo(
    () => ({
      [SERVER_ERROR]: t('errors.serverError'),
      [REQUIRED_ERROR]: t('common.required'),
      [INVALID_EMAIL_FORMAT]: t('auth.invalidEmail'),
      [MISMATCH_ERROR]: t('auth.passwordMismatch'),
      [MAX_LENGTH_ERROR]: t('auth.passwordTooShort')
    }),
    [t]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const isValid = validate({
      name: (val) => (!val ? REQUIRED_ERROR : null),
      email: (val) => {
        if (!val) return REQUIRED_ERROR
        if (!EMAIL_REGEX.test(val)) return INVALID_EMAIL_FORMAT
        return null
      },
      password: (val) => {
        if (!val) return REQUIRED_ERROR
        if (val.length < 6) return MAX_LENGTH_ERROR
        return null
      },
      confirmPassword: (val) => {
        if (!val) return REQUIRED_ERROR
        if (val !== values.password) return MISMATCH_ERROR
        return null
      }
    })

    if (!isValid) return

    setIsLoading(true)
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password
      })
      reset()
      alert(t('auth.registerSuccess'))
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : SERVER_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1 className='auth-title'>{t('auth.registerTitle')}</h1>
            <p className='auth-subtitle'>{t('auth.registerDescription')}</p>
          </div>

          {error && (
            <div className='auth-error'>
              {errorMessage[error as keyof typeof errorMessage]}
            </div>
          )}

          <form onSubmit={handleSubmit} className='auth-form'>
            <Input
              label={t('auth.nameLabel')}
              type='text'
              placeholder='John Doe'
              {...bind('name')}
              error={errorMessage[errors.name as keyof typeof errorMessage]}
              disabled={isLoading}
            />

            <Input
              label={t('auth.emailLabel')}
              type='text'
              placeholder='example@email.com'
              {...bind('email')}
              error={errorMessage[errors.email as keyof typeof errorMessage]}
              disabled={isLoading}
            />

            <Input
              label={t('auth.passwordLabel')}
              type='password'
              placeholder='••••••••'
              {...bind('password')}
              error={errorMessage[errors.password as keyof typeof errorMessage]}
              disabled={isLoading}
            />

            <Input
              label={t('auth.confirmPassword')}
              type='password'
              placeholder='••••••••'
              {...bind('confirmPassword')}
              error={
                errorMessage[
                  errors.confirmPassword as keyof typeof errorMessage
                ]
              }
              disabled={isLoading}
            />

            <Button
              id='register-button'
              type='submit'
              variant='primary'
              fullWidth
              isLoading={isLoading}
            >
              {t('common.register')}
            </Button>
          </form>

          <div className='auth-footer'>
            <p>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to='/login' className='auth-link'>
                {t('common.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
