const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json');
const { resolve } = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
// console.log(process.env.VUE_APP_PUBLIC_PATH);
// process.env.VUE_APP_PUBLIC_PATH = './';
console.log(process.env.VUE_APP_PUBLIC_PATH);
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
    plugins: [
      require('unplugin-element-plus/webpack')({
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
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    },
  },
});
