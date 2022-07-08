const { CopyWebpackPlugin } = require('./copy');
const { HtmlWebpackPlugin } = require('./html');

module.exports = {
  createWebpackScripts(config, options) {
    // const plugins = [];
    if (options.copy) {
      config.plugin('copy').tap((args) => {
        args[0].patterns.push(CopyWebpackPlugin(options));
        return args;
      });
    }
    if (options.html) {
      config.plugin('html').tap((args) => {
        args[0].scripts = HtmlWebpackPlugin(options);
        return args;
      });
    }
    return config;
  },
};
