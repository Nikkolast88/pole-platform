module.exports = {
  unplugin() {
    return require('unplugin-element-plus/webpack')({
      // options
      useSource: true,
    });
  },
};
