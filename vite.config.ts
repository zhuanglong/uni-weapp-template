import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import Unocss from 'unocss/vite';
import UnpluginSvgComponent from 'unplugin-svg-component/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://github.com/antfu/unocss
    Unocss(),
    UnpluginSvgComponent({
      iconDir: path.resolve(__dirname, './src/assets/icons'),
      preserveColor: path.resolve(__dirname, './src/assets/icons'),
      dts: true,
      dtsDir: path.resolve(__dirname, './types'),
      componentStyle: 'width: 1em; height: 1em;',
    }),
  ],

  server: {
    host: '0.0.0.0',
    proxy: {
      '/dev-api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixin/index.scss";',
      },
    },
  },
});
