import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
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
