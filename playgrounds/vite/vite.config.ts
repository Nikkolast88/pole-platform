import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    // proxy: {
    //   '/iot-api': 'https://192.168.49.217',
    // },
  },
  plugins: [vue()],
});
