module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/design/_global-design.scss"'
      }
    }
  }
};
