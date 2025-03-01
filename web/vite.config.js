import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.ts'],
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 6688,
    open: true
  },
})
