import type { Locale } from './types'

export const INVALID_CREDENTIAL = 'INVALID_CREDENTIAL'
export const SERVER_ERROR = 'SERVER_ERROR'
export const REQUIRED_ERROR = 'REQUIRED_ERROR'
export const INVALID_EMAIL_FORMAT = 'INVALID_EMAIL_FORMAT'
export const MISMATCH_ERROR = 'MISMATCH_ERROR'
export const MAX_LENGTH_ERROR = 'MAX_LENGTH_ERROR'
export const POPUP_CLOSED_BY_USER = 'POPUP_CLOSED_BY_USER'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LOCALE: Record<Locale, string> = {
  en: 'en-US',
  id: 'id-ID'
}
