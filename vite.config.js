import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup path alias for easy imports using @/ (e.g., import '@/components/Header')
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimization for large projects like a streaming service interface
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group essential libraries for better caching and loading
            if (
              id.includes('react') ||
              id.includes('router') ||
              id.includes('axios') ||
              id.includes('framer-motion')
            ) {
              return 'vendor_core';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})