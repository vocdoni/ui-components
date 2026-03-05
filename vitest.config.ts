import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const ffjavascriptPnpmPath = fs
  .readdirSync(path.resolve(rootDir, 'node_modules/.pnpm'))
  .find((entry) => entry.startsWith('ffjavascript@'))

const ffjavascriptAlias = ffjavascriptPnpmPath
  ? path.resolve(rootDir, `node_modules/.pnpm/${ffjavascriptPnpmPath}/node_modules/ffjavascript/build/main.cjs`)
  : 'ffjavascript'

export default defineConfig({
  resolve: {
    alias: {
      ffjavascript: ffjavascriptAlias,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(rootDir, 'setup-tests.ts')],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/dist/**', 'setup-tests.ts'],
    },
  },
})
