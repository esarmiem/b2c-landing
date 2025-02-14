import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  server: {
    proxy: {
      '/isl-login': {
        target: 'https://preview.ilsbsys.com/apirest_v1/auth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/isl-login/, '')
      },
      '/mi-travelkit': {
        target: 'https://api.mitravelkit.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mi-travelkit/, '')
      }
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