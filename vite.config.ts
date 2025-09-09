import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const buildAssetsPath = 'sites/MarpeArava/MarpeApp/assets';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Marpe Arava',
        short_name: 'Marpe',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait', // 🔥 מכריח אנכי
        background_color: '#ffffff',
        theme_color: '#1a73e8',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    proxy: {
      '/_api': 'http://localhost:3000/sites/MarpeArava_NP',
      '^/sites/[^/]+/_api': 'http://localhost:3000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `${buildAssetsPath}/index.js`,
        chunkFileNames: `${buildAssetsPath}/[name].js`,
        assetFileNames: (file) => {
          // file.name is deprecated but אני לא מתרגש מזה כרגע
          return file.name === 'index.css'
            ? `${buildAssetsPath}/[name].[ext]`
            : `${buildAssetsPath}/[name]-[hash].[ext]`;
        },
      },
    },
  },
});
