module.exports = {
  API: '/iot-api', //Api请求
  IMG: '//127.0.0.1', // 图片地址
  NAME: '主应用',
  APPS: [
    {
      name: '@pole-platform/business',
      entry: '//localhost:8081',
      container: '#container',
      activeRule: '/business/',
    },
  ],
};
