import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  test: {
    globals: true,         // This enables global `test`, `expect`, etc.
    environment: 'jsdom', 
 // Simulates a browser environment
  },
 
})
