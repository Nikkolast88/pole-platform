const { compression } = require('./compression');
const { unplugin } = require('./unplugin');
const ManifestScriptWebpackPlugin = require('manifest-script-webpack-plugin');
const devConf = require('../../configs/config.dev');
const prodConf = require('../../configs/config.prod');
module.exports = {
  createWebpackPlugins() {
    /**
     * 清单
     * @returns {Array}
     */
    const getManifest = () => {
      const config =
        process.env.NODE_ENV === 'production'
          ? Object.assign(devConf, prodConf)
          : Object.assign(prodConf, devConf);

      const manifest = flattenObject(config);
      console.log(manifest);
      return manifest;
    };

    const flattenObject = (conf) => {
      for (const key in conf) {
        const value = conf[key];
        if (typeof value === 'object') {
          conf[key] = flattenObject(value);
        } else {
          const flag = value.indexOf('${') > -1;
          if (flag) {
            conf[key] = value.replace('"', '').replace('"', '');
          }
        }
      }
      return conf;
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
