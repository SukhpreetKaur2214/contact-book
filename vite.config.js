import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/contact-book/',  // repo name as your base path
  plugins: [vue()]
})
