import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base нужен, чтобы ассеты правильно грузились на GitHub Pages
// (https://<user>.github.io/wb-label-generator/)
export default defineConfig({
  plugins: [react()],
  base: '/wb-label-generator/',
})
