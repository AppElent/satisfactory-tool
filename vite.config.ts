import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: {
    //   '@': resolve(__dirname, 'src'),
    //   '#root': resolve(__dirname),
    // },
    alias: {
      '@': '/src',
    },
  },
});
