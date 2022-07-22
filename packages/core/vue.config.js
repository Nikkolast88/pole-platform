const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
// webpack插件
const { createWebpackPlugins } = require('./build/plugins');
const { minimize } = require('./build/utils');
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      // 自定义主题
      scss: {
        // eslint-disable-next-line quotes
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
    // 拷贝配置文件
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: createWebpackPlugins(),
    optimization: minimize(),
  },
});
