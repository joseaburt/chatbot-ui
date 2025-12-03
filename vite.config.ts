import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/ui'),
      '@infra': path.resolve(__dirname, './src/infra'),
      '@core': path.resolve(__dirname, './src/core'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'ChatWidget',
      fileName: 'chatbox',
      formats: ['umd'],
    },
    minify: 'terser', // compresión mejor que esbuild para UMD
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_getters: true,
        keep_infinity: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
});
