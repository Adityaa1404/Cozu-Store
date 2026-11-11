import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'terser',
    rollupOptions: {
      input: 'index.html'
    },
    cssMinify: true
  },
  css: {
    postcss: './postcss.config.js'
  }
});