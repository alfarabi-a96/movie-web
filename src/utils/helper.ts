import {
  INVALID_CREDENTIAL,
  POPUP_CLOSED_BY_USER,
  SERVER_ERROR
} from '../constants'

export const errorMap = (error: unknown): Error => {
  if (
    error instanceof Error &&
    error.message.includes('auth/invalid-credential')
  ) {
    return new Error(INVALID_CREDENTIAL)
  } else if (
    error instanceof Error &&
    error.message.includes('auth/popup-closed-by-user')
  ) {
    return new Error(POPUP_CLOSED_BY_USER)
  }
  return new Error(SERVER_ERROR)
}
