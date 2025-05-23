import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // 🔧 Fixed: use full URL
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:3001', // Proxy WebSocket traffic
        ws: true
      }
    }
  }
})
