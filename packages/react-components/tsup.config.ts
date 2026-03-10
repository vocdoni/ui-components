import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  target: 'esnext',
  dts: true,
  sourcemap: false,
  entry: {
    index: 'src/index.ts',
    pagination: 'src/pagination.ts',
  },
})
