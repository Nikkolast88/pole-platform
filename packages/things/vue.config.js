const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json');
const { resolve } = require('path');

// webpack插件
const { createWebpackPlugins } = require('./build/plugins');
const { minimize } = require('./build/utils');
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        // eslint-disable-next-line quotes
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    plugins: createWebpackPlugins(),
    optimization: minimize(),
  },
});
