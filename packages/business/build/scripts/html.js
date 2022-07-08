module.exports = {
  HtmlWebpackPlugin(options) {
    const html = [
      {
        src: `${options.manifestName}.js`,
        type: 'text/javascript',
      },
    ];
    return html;
  },
};
