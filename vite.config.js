import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
=======
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
>>>>>>> f534614f674defe12968f1e740397c4b4384db6e
})
