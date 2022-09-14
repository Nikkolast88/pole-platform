module.exports = {
  API: '/iot-api', //Api请求
  IMG: '//127.0.0.1', // 图片地址
  NAME: '主应用',
  APPS: [
    // 子应用
    {
      name: '@pole-platform/business',
      entry: '//localhost:8081',
      container: '#container',
      activeRule: '/business/',
    },
    // {
    //   name: '@pole-platform/things',
    //   entry: '//localhost:8082',
    //   container: '#container',
    //   activeRule: '/things',
    // },
  ],
};
