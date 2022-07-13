const { resolve } = require('path');
const { format } = require('prettier');
const devConfig = require('../../config/config.dev');
const prodConfig = require('../../config/config.dev');
const stageConfig =
  process.env.NODE_ENV === 'development'
    ? Object.assign(prodConfig, devConfig)
    : Object.assign(devConfig, prodConfig);

module.exports = {
  CopyWebpackPlugin(options) {
    const copy = {
      from: resolve(__dirname, './copy.js'),
      to: resolve(
        __dirname,
        `../../${options.outputDir}/${options.manifestName}.js`,
      ),
      transform() {
        return Buffer.from(
          format(
            `window.${options.manifestName}=${JSON.stringify(stageConfig)}`,
          ),
        );
      },
    };
    return copy;
  },
};
