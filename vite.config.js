import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/library-app-vite/',  // GitHub Pages に公開する場合
});
