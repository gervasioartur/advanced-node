module.exports = {
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '@/__tests__/(.+)': '<rootDir>/__tests__/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src/',
    '<rootDir>/__tests__/'
  ],
  transform: {
    '.\\.ts$': 'ts-jest'
  }
}
