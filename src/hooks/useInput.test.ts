import { renderHook, act } from '@testing-library/react'
import { useInput } from './useInput'

describe('useInput Hook', () => {
  it('initializes with empty string', () => {
    const { result } = renderHook(() => useInput())
    expect(result.current.value).toBe('')
  })

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useInput('test'))
    expect(result.current.value).toBe('test')
  })

  it('updates value on change', () => {
    const { result } = renderHook(() => useInput())

    act(() => {
      result.current.bind.onChange({
        target: { value: 'hello' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('hello')
  })

  it('resets value', () => {
    const { result } = renderHook(() => useInput('initial'))

    act(() => {
      result.current.bind.onChange({
        target: { value: 'changed' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('changed')

    act(() => {
      result.current.reset()
    })

    expect(result.current.value).toBe('initial')
  })

  it('binds input correctly', () => {
    const { result } = renderHook(() => useInput('test'))
    const bind = result.current.bind

    expect(bind.value).toBe('test')
    expect(typeof bind.onChange).toBe('function')
  })
})
