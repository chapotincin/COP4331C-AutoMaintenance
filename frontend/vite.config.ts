import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  root: 'frontend',
  build: {
    outDir: '../dist',
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
})
