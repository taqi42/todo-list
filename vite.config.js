import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://taqi42.github.io/todo-list",
  plugins: [react()],
})
