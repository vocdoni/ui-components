import react from '@vitejs/plugin-react'
import path from 'node:path'
import { LibraryFormats, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { peerDependencies } from './package.json'

// under development avoid bundling stuff that we're not gonna use to reduce time
const formats: LibraryFormats[] = ['es']
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
      external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsx',
          '@chakra-ui/alert': 'Alert',
          '@chakra-ui/button': 'Button',
          '@chakra-ui/card': 'Card',
          '@chakra-ui/form-control': 'FormControl',
          '@chakra-ui/image': 'Image',
          '@chakra-ui/layout': 'Text',
          '@chakra-ui/progress': 'Progress',
          '@chakra-ui/radio': 'Radio',
          '@chakra-ui/system': 'chakra',
          '@chakra-ui/table': 'Table',
          '@chakra-ui/tag': 'Tag',
          '@chakra-ui/theme': 'theme',
          '@chakra-ui/toast': 'toast',
          '@vocdoni/sdk': 'VocdoniSDKClient',
          'react-markdown': 'ReactMarkdown',
          'remark-gfm': 'remarkGfm',
        },
      },
    },
  },
})
