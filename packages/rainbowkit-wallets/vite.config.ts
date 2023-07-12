import path from 'node:path'
import { LibraryFormats, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// avoid bundling stuff under development that we're not gonna use to reduce time
const formats: LibraryFormats[] = ['es']
if (process.env.NODE_ENV !== 'development') {
  formats.push('cjs')
}

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VocdoniRainbowkitWallets',
      formats,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'ethers', 'wagmi', 'react/jsx-runtime'],
      output: {
        globals: {
          ethers: 'ethers',
          react: 'React',
          'react/jsx-runtime': 'JSX',
          wagmi: 'wagmi',
        },
      },
    },
  },
})
