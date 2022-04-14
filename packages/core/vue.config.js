const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
console.log(process.env.VUE_APP_PUBLIC_PATH);
module.exports = defineConfig({
  publicPath: '/',
  devServer: {
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
    config.resolve.alias.set('@', resolve('./src/'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
        useSource: true,
      }),
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
});
