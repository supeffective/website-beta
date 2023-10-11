/// <reference types="vite/client" />

/**
 * @see https://vitejs.dev/config
 */

import path, { resolve } from 'node:path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    cssCodeSplit: false,
    sourcemap: 'inline',
    ssr: false,
    rollupOptions: {
      treeshake: true,
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'index-chunk.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      rollupTypes: true,
      exclude: ['*.d.ts'],
    }),
  ],
  assetsInclude: ['public/**/*'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/': path.resolve(__dirname, './src'),
    },
  },
})
