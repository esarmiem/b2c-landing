import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"



export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_ISL_AUTHENTICATION,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
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