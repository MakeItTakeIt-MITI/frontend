/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true
  },
  build: {
    manifest: true,
    target: "esnext",
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});