import '@testing-library/jest-dom'
import util from 'util'
import fetch from 'node-fetch'

// Manual mocks for Vite env variables
jest.mock(
  './src/clients/endpoint.ts',
  () => ({
    FIREBASE_API_KEY: 'mock-firebase-api-key',
    FIREBASE_PROJECT_ID: 'mock-firebase-project-id',
    FIREBASE_STORAGE_BUCKET: 'mock-firebase-storage-bucket',
    FIREBASE_APP_ID: 'mock-firebase-app-id',
    FIREBASE_AUTH_DOMAIN: 'mock-firebase-auth-domain',
    FIREBASE_MESSAGING_SENDER_ID: 'mock-firebase-messaging-sender-id',
    FIREBASE_MEASUREMENT_ID: 'mock-firebase-measurement-id',
    API_BASE_URL: 'http://localhost:3000',
    API_TOKEN: 'mock-api-token',
    IMAGE_BASE_URL: 'http://localhost:3000/images'
  }),
  { virtual: true }
)

// Polyfill TextEncoder/TextDecoder for Node.js environment
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = util as unknown as {
    TextEncoder: typeof globalThis.TextEncoder
    TextDecoder: typeof globalThis.TextDecoder
  }
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Polyfill fetch for Jest/jsdom
if (typeof global.fetch === 'undefined') {
  global.fetch = fetch as unknown as typeof globalThis.fetch
}

// Polyfill Web APIs for Firebase
if (typeof global.Response === 'undefined') {
  const nodeFetch = fetch as unknown as {
    Response: typeof globalThis.Response
    Request: typeof globalThis.Request
    Headers: typeof globalThis.Headers
  }
  global.Response = nodeFetch.Response
}

if (typeof global.Request === 'undefined') {
  const nodeFetch = fetch as unknown as {
    Response: typeof globalThis.Response
    Request: typeof globalThis.Request
    Headers: typeof globalThis.Headers
  }
  global.Request = nodeFetch.Request
}

if (typeof global.Headers === 'undefined') {
  const nodeFetch = fetch as unknown as {
    Response: typeof globalThis.Response
    Request: typeof globalThis.Request
    Headers: typeof globalThis.Headers
  }
  global.Headers = nodeFetch.Headers
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    // mock
  }

  observe() {
    // mock
  }

  takeRecords() {
    return []
  }

  unobserve() {
    // mock
  }
} as unknown as typeof globalThis.IntersectionObserver
