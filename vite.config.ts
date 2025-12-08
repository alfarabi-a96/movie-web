import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth'],
          'query-vendor': ['@tanstack/react-query'],
          'i18n-vendor': ['i18next', 'react-i18next']
        }
      }
    },
    // Optimize chunk size and provide warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in non-production (optional for debugging)
    sourcemap: false,
    // Minify with esbuild (default and faster than terser)
    minify: 'esbuild'
  },
  // Only include dependencies that don't have proper ESM exports
  // Vite handles most deps automatically with smart heuristics
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'i18next',
      'react-i18next'
    ],
    // Exclude Firebase if it has issues with pre-bundling
    exclude: ['firebase/app', 'firebase/auth']
  }
})
