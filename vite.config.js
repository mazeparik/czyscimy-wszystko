import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oproznianie: resolve(__dirname, 'oproznianie-mieszkan.html'),
        gabaryty: resolve(__dirname, 'wywoz-gabarytow.html'),
        gruz: resolve(__dirname, 'wywoz-gruzu.html'),
        smieci: resolve(__dirname, 'wywoz-smieci.html'),
        piwnice: resolve(__dirname, 'sprzatanie-piwnic.html'),
      }
    }
  }
});
