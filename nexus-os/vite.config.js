import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        courses: resolve(__dirname, 'courses.html'),
        contact: resolve(__dirname, 'contact.html'),
        whyme: resolve(__dirname, 'why-me.html')
      }
    }
  },
  server: {
    port: 3000
  }
});