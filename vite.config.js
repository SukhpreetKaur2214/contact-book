import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/contact-book/', // Your GitHub repo name
  plugins: [vue()],
})
