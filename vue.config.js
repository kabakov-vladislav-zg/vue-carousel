const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: false,
  pages: {
    index: {
      entry: './demo/main.ts',
      template: './demo/index.html',
      title: '',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/vue-carousel/',
});
