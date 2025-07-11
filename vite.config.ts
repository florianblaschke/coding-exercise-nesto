import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// biome-ignore lint/style/useNodejsImportProtocol: No require in ts
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
