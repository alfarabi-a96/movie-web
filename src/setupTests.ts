import '@testing-library/jest-dom'

// Polyfills untuk Jest
// @ts-ignore
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  // @ts-ignore
  global.TextEncoder = TextEncoder
  // @ts-ignore
  global.TextDecoder = TextDecoder
}

// Mock IntersectionObserver
// @ts-ignore
if (typeof IntersectionObserver === 'undefined') {
  // @ts-ignore
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  }
}

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toBeDisabled(): R
      toHaveAttribute(name: string, value?: string): R
    }
  }
}


