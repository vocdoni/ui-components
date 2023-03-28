import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.VOCDONI_ENVIRONMENT': process.env.VOCDONI_ENVIRONMENT || '"stg"',
  },
  plugins: [tsconfigPaths(), react()],
})
