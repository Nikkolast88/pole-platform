const { compression } = require('./compression');
const { unplugin } = require('./unplugin');
const ManifestScriptWebpackPlugin = require('manifest-script-webpack-plugin');
const devConfig = require('../../configs/config.dev');
const prodConfig = require('../../configs/config.prod');

module.exports = {
  createWebpackPlugins() {
    /**
     * 清单
     * @returns {Array}
     */
    const getManifest = () => {
      return process.env.NODE_ENV === 'production'
        ? Object.assign(devConfig, prodConfig)
        : Object.assign(prodConfig, devConfig);
    };

    let plugins = [
      new ManifestScriptWebpackPlugin({
        manifest: getManifest(),
      }),
    ];
    if (process.env.NODE_ENV === 'production') {
      plugins = [...plugins, ...[compression(), unplugin()]];
    }
    return plugins;
  },
};
