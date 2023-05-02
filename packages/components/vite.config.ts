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
      external: [
        'react',
        'react-dom',
        '@chakra-ui/system',
        '@chakra-ui/alert',
        '@chakra-ui/button',
        '@chakra-ui/form-control',
        '@chakra-ui/image',
        '@chakra-ui/layout',
        '@chakra-ui/radio',
        '@chakra-ui/system',
        '@chakra-ui/table',
        '@chakra-ui/tag',
        '@chakra-ui/theme',
        '@chakra-ui/toast',
        'react/jsx-runtime',
        'react-markdown',
        'remark-gfm',
        '@vocdoni/sdk',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsx',
          '@chakra-ui/system': 'chakra',
          '@chakra-ui/alert': 'Alert',
          '@chakra-ui/button': 'Button',
          '@chakra-ui/form-control': 'FormControl',
          '@chakra-ui/image': 'Image',
          '@chakra-ui/layout': 'Text',
          '@chakra-ui/radio': 'Radio',
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
