import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   base: './', // This is crucial for static deployments
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  plugins: [react(),
    tailwindcss(),
  ],
  test: {
    globals: true,         // This enables global `test`, `expect`, etc.
    environment: 'jsdom', 
 // Simulates a browser environment
  },
 
})
