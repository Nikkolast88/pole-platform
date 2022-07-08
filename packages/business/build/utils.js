const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  minimize() {
    let minimizer = {};
    if (process.env.NODE_ENV === 'production') {
      minimizer = {
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
      };
    }
    return minimizer;
  },
};
