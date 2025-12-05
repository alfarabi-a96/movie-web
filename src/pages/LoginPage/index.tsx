import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useForm } from '../../hooks/useInput'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import {
  EMAIL_REGEX,
  INVALID_CREDENTIAL,
  INVALID_EMAIL_FORMAT,
  POPUP_CLOSED_BY_USER,
  REQUIRED_ERROR,
  SERVER_ERROR
} from '../../constants'
import './index.css'

export const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, bind, validate, reset } = useForm({
    email: '',
    password: ''
  })

  const errorMessage = useMemo(
    () => ({
      [INVALID_CREDENTIAL]: t('errors.loginError'),
      [SERVER_ERROR]: t('errors.serverError'),
      [REQUIRED_ERROR]: t('common.required'),
      [INVALID_EMAIL_FORMAT]: t('auth.invalidEmail'),
      [POPUP_CLOSED_BY_USER]: t('errors.popupClosedByUser')
    }),
    [t]
  )

  const handleSubmit = async (e: React.FormEvent, isWithGoogle = false) => {
    e.preventDefault()
    setError('')

    const isValid =
      !isWithGoogle &&
      validate({
        email: (val) => {
          if (!val) return REQUIRED_ERROR
          if (!EMAIL_REGEX.test(val)) return INVALID_EMAIL_FORMAT
          return null
        },
        password: (val) => (!val ? REQUIRED_ERROR : null)
      })

    if (!isValid && !isWithGoogle) return

    setIsLoading(true)
    try {
      await login({
        email: values.email,
        password: values.password,
        isWithGoogle
      })
      reset()
      navigate('/')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : SERVER_ERROR
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // const handleSocialLogin = async (
  //   provider: 'facebook' | 'google' | 'apple'
  // ) => {
  //   setError('');
  //   setIsLoading(true);
  //   try {
  //     const mockData = {
  //       id: `${provider}-${Date.now()}`,
  //       name: `Demo User (${provider})`,
  //       email: `demo-${provider}@Alpha Movie.local`,
  //       avatar: undefined,
  //     };
  //     await loginWithSocial(provider, mockData);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : t('errors.serverError'));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1 className='auth-title'>{t('auth.loginTitle')}</h1>
            <p className='auth-subtitle'>{t('auth.loginDescription')}</p>
          </div>

          {error && (
            <div className='auth-error'>
              {errorMessage[error as keyof typeof errorMessage]}
            </div>
          )}

          <form onSubmit={handleSubmit} className='auth-form'>
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

            <Button
              type='submit'
              variant='primary'
              size='sm'
              fullWidth
              isLoading={isLoading}
            >
              {t('common.login')}
            </Button>
          </form>

          <div className='auth-divider'>
            <span>{t('auth.orContinueWith')}</span>
          </div>

          <div className='auth-social'>
            <Button
              type='button'
              variant='secondary'
              fullWidth
              size='sm'
              onClick={(event) => handleSubmit(event, true)}
              disabled={isLoading}
              className='auth-social-btn'
            >
              G {t('auth.googleLogin')}
            </Button>
          </div>

          <div className='auth-footer'>
            <p>
              {t('auth.dontHaveAccount')}{' '}
              <Link to='/register' className='auth-link'>
                {t('common.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
