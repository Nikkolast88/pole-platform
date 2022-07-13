module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          inlineStyles: {
            onlyMatchedOnce: false,
          },

          // or disable plugins
          removeDoctype: false,
        },
      },
    },
    {
      name: 'removeDimensions',
      removeDimensions: true,
    },
    {
      name: 'removeStyleElement',
      removeStyleElement: true,
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke)',
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{
          fill: 'currentColor'
        }]
      },
    },
  ],
};
