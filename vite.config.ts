import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  server: {
    proxy: {
      '/isl-login': {
        target: 'https://dtravelassist.com/apirest_v1/auth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/isl-login/, '')
      },
      '/mi-travelkit': {
        //target: 'https://api.mitravelkit.com/api/v1',
        target: 'http://127.0.0.1:3000/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mi-travelkit/, '')
      },
      '/plan-upgrades': {
        target: 'https://dtravelassist.com/apirest_v1/information',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plan-upgrades/, '')
      },
    }
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})