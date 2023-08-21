const config = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['<rootDir>/templates'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': '@swc-node/jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig/react-library.json',
    },
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}

export default config
