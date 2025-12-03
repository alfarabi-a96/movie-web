import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useInput';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/pages/Auth.css';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register, loginWithSocial } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, bind, validate, reset } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValid = validate({
      name: (val) => (!val ? t('common.required') : null),
      email: (val) => {
        if (!val) return t('common.required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return t('auth.invalidEmail');
        return null;
      },
      password: (val) => {
        if (!val) return t('common.required');
        if (val.length < 6) return t('auth.passwordTooShort');
        return null;
      },
      confirmPassword: (val) => {
        if (!val) return t('common.required');
        if (val !== values.password) return t('auth.passwordMismatch');
        return null;
      },
    });

    if (!isValid) return;

    setIsLoading(true);
    try {
      await register(
        {
          name: values.name,
          email: values.email,
          loginMethod: 'email',
        },
        values.password
      );
      reset();
      // Show success message and redirect to login
      alert(t('auth.registerSuccess'));
      navigate('/login');
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
            <h1 className="auth-title">{t('auth.registerTitle')}</h1>
            <p className="auth-subtitle">{t('auth.registerDescription')}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label={t('auth.nameLabel')}
              type="text"
              placeholder="John Doe"
              {...bind('name')}
              error={errors.name}
              disabled={isLoading}
              required
            />

            <Input
              label={t('auth.emailLabel')}
              type="email"
              placeholder="example@email.com"
              {...bind('email')}
              error={errors.email}
              disabled={isLoading}
              required
            />

            <Input
              label={t('auth.passwordLabel')}
              type="password"
              placeholder="••••••••"
              {...bind('password')}
              error={errors.password}
              disabled={isLoading}
              required
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              placeholder="••••••••"
              {...bind('confirmPassword')}
              error={errors.confirmPassword}
              disabled={isLoading}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              {t('common.register')}
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
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="auth-social-btn"
            >
              f {t('auth.facebookLogin')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="auth-social-btn"
            >
              G {t('auth.googleLogin')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="auth-social-btn"
            >
              🍎 {t('auth.appleLogin')}
            </Button>
          </div>

          <div className="auth-footer">
            <p>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" className="auth-link">
                {t('common.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
