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
      '/plan-upgrades': {
        target: 'https://dtravelassist.com/apirest_v1/information',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plan-upgrades/, '')
      },
      '/epayco-ip': {
        target: 'https://apify-private.epayco.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/epayco-ip/, '')
      },
      '/epayco-payment': {
        target: 'https://secure.epayco.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/epayco-payment/, '')
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