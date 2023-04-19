import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// under development avoid bundling stuff that we're not gonna use to reduce time
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
      name: 'VocdoniReactComponents',
      formats,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@chakra-ui/system', 'react-markdown', 'remark-gfm', '@vocdoni/sdk'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@chakra-ui/system': 'chakra',
          '@vocdoni/sdk': 'VocdoniSDKClient',
          'react-markdown': 'ReactMarkdown',
          'remark-gfm': 'remarkGfm',
        },
      },
    },
  },
})
