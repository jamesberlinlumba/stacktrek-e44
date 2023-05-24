import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../backend/dist',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
  plugins: [react()],
})
