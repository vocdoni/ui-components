import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  sourcemap: false,
  entry: ['src/index.ts'],
})
