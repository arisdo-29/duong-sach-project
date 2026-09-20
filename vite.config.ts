import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

function expressPlugin(): Plugin {
  return {
    name: 'express-plugin',
    async configureServer(server) {
      process.env.VITE_DEV_SERVER = 'true';
      const { app } = await import('./server/app.ts');
      server.middlewares.use(app);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
