// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // For browser-like environment
    globals: true,         // To access globals like `describe`, `it`, etc.
    setupFiles: ['./vitest.setup.ts'],
  },
})