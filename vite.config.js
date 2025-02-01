import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from other devices on the network
    port: 3000, // Change the port if needed
    open: true, // Automatically open the app in the browser
  },
  build: {
    rollupOptions: {
      input: './index.html', // Ensure the main entry point is index.html
    },
  },
});