import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base нужен, чтобы ассеты правильно грузились на GitHub Pages
// (https://mozgroup-projects.github.io/wb/)
export default defineConfig({
  plugins: [react()],
  base: '/wb/',
})
