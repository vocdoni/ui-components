import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
if (!vocdoniEnvironment) {
  vocdoniEnvironment = 'stg'
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.VOCDONI_ENVIRONMENT': `"${vocdoniEnvironment}"`,
  },
  plugins: [tsconfigPaths(), react()],
  build: {
    // hides warnings `Module level directives cause errors when bundled, "use client"`
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
    },
  },
})
