import { useState, useCallback } from 'react'

interface UseInputReturn {
  values: Record<string, string>
  errors: Record<string, string>
  setFieldValue: (field: string, value: string) => void
  setFieldError: (field: string, error: string) => void
  bind: (field: string) => {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  reset: () => void
  validate: (
    validators: Record<string, (val: string) => string | null>
  ) => boolean
}

export const useInput = (
  initialValues: Record<string, string>
): UseInputReturn => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const setFieldValue = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [])

  const bind = useCallback(
    (field: string) => ({
      value: values[field] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(field, e.target.value)
      }
    }),
    [values, setFieldValue]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const validate = useCallback(
    (validators: Record<string, (val: string) => string | null>) => {
      const newErrors: Record<string, string> = {}
      let isValid = true

      Object.entries(validators).forEach(([field, validator]) => {
        const error = validator(values[field] || '')
        if (error) {
          newErrors[field] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      return isValid
    },
    [values]
  )

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    bind,
    reset,
    validate
  }
}
