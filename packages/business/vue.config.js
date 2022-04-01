import { ProjectOptions } from '@vue/cli-service';
import { name } from './package.json';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
const config: ProjectOptions = {
  devServer: {
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
};

export default config;
