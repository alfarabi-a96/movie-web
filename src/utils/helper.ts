import { INVALID_CREDENTIAL, POPUP_CLOSED_BY_USER } from "../constants"

export const errorMap = (error: unknown): Error => {
  if (error instanceof Error && error.message.includes('auth/invalid-credential')) {
    return new Error(INVALID_CREDENTIAL)
  } else if (error instanceof Error && error.message.includes('auth/popup-closed-by-user')) {
    return new Error(POPUP_CLOSED_BY_USER)
  }
  // Return the original error or create a new Error object
  return error instanceof Error ? error : new Error(String(error))
}