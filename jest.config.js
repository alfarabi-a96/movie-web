export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(.+)/clients/endpoint$': '<rootDir>/__mocks__/endpoint.ts',
    '^(.+)/clients/httpClient$': '<rootDir>/__mocks__/httpClient.ts',
    '^src/clients/firestoreClient$': '<rootDir>/__mocks__/firestoreClient.ts'
  },
  transformIgnorePatterns: ['node_modules/(?!(firebase|@firebase)/)'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/clients/endpoint.ts',
    '!src/clients/firestoreClient.ts'
  ]
}
