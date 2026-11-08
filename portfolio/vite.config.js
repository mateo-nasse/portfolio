import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The site lives at the root of mateonasse.com (hosted on Vercel). The old GitHub Pages copy
  // lives under /portfolio/, so its workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
