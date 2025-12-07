import { errorMap } from './helper'
import { INVALID_CREDENTIAL, POPUP_CLOSED_BY_USER } from '../constants'

describe('Helper Utils', () => {
  describe('errorMap', () => {
    it('maps invalid credential error', () => {
      const error = new Error('auth/invalid-credential')
      const result = errorMap(error)
      expect(result.message).toBe(INVALID_CREDENTIAL)
    })

    it('maps popup closed by user error', () => {
      const error = new Error('auth/popup-closed-by-user')
      const result = errorMap(error)
      expect(result.message).toBe(POPUP_CLOSED_BY_USER)
    })

    it('returns original error for unknown errors', () => {
      const error = new Error('Some other error')
      const result = errorMap(error)
      expect(result.message).toBe('Some other error')
    })

    it('converts non-Error objects to Error', () => {
      const result = errorMap('string error')
      expect(result instanceof Error).toBe(true)
      expect(result.message).toBe('string error')
    })

    it('handles null gracefully', () => {
      const result = errorMap(null)
      expect(result instanceof Error).toBe(true)
    })
  })
})
