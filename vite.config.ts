import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        options: path.resolve(__dirname, 'options.html'),
        // Add your service worker as an entry point
        background: path.resolve(__dirname, 'src/background/serviceWorker.ts'),
      },
      output: {
        entryFileNames: chunk => {
          // Place service worker at root of dist/
          if (chunk.name === 'background') return 'serviceWorker.js';
          return '[name].js';
        }
      }
    }
  }
});
