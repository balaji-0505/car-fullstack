import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Vite configuration with backend proxy
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // local frontend port (default for Vite)
    proxy: {
      // 🔁 Forward API requests to your backend (NodePort 30083)
      '/api': {
        target: 'http://localhost:30083',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
