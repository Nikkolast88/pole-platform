const { compression } = require('./compression');
const { unplugin } = require('./unplugin');
module.exports = {
  createWebpackPlugins() {
    let plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins = [compression(), unplugin()];
    }
    return plugins;
  },
};
