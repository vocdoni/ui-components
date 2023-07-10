import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// avoid bundling stuff under development that we're not gonna use to reduce time
const formats = ['es']
if (process.env.NODE_ENV !== 'development') {
  formats.push('cjs', 'umd')
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DotObject',
      formats,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react-modal', 'localforage'],
      output: {
        globals: {
          'react-modal': 'react-modal',
          localforage: 'localforage',
        },
      },
    },
  },
})
