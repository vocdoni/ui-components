const config = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['<rootDir>/templates'],
  moduleNameMapper: {
    '^ffjavascript$': '<rootDir>/node_modules/ffjavascript/build/main.cjs',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': '@swc-node/jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!ffjavascript).+\\.(js|jsx)$'],
  testPathIgnorePatterns: ['[/\\\\]dist[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig/react-library.json',
    },
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}

export default config
