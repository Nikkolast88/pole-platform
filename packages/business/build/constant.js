module.exports = {
  defaultWebpack() {
    const options = {
      copy: {},
      html: {},
      // 输出目录
      outputDir: 'dist',
      // 配置清单文件
      manifestName: 'manifest',
    };
    return { ...options };
  },
};
