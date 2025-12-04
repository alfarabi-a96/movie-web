import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useInput';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import './index.css';
import { EMAIL_REGEX } from '../../constants';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, loginWithSocial } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, bind, validate, reset } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = validate({
      email: (val) => {
        if (!val) return t('common.required');
        if (!EMAIL_REGEX.test(val)) return t('auth.invalidEmail');
        return null;
      },
      password: (val) => (!val ? t('common.required') : null),
    });

    if (!isValid) return;

    setIsLoading(true);
    
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      reset();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.serverError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: 'facebook' | 'google' | 'apple'
  ) => {
    setError('');
    setIsLoading(true);
    try {
      const mockData = {
        id: `${provider}-${Date.now()}`,
        name: `Demo User (${provider})`,
        email: `demo-${provider}@movieflix.local`,
        avatar: undefined,
      };
      await loginWithSocial(provider, mockData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.serverError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{t('auth.loginTitle')}</h1>
            <p className="auth-subtitle">{t('auth.loginDescription')}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label={t('auth.emailLabel')}
              type="email"
              placeholder="example@email.com"
              {...bind('email')}
              error={errors.email}
              disabled={isLoading}
            />

            <Input
              label={t('auth.passwordLabel')}
              type="password"
              placeholder="••••••••"
              {...bind('password')}
              error={errors.password}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size='sm'
              fullWidth
              isLoading={isLoading}
            >
              {t('common.login')}
            </Button>
          </form>

          <div className="auth-divider">
            <span>{t('auth.orContinueWith')}</span>
          </div>

          <div className="auth-social">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              size='sm'
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="auth-social-btn"
            >
              G {t('auth.googleLogin')}
            </Button>
          </div>

          <div className="auth-footer">
            <p>
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/register" className="auth-link">
                {t('common.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
