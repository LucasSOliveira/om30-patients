
const path = require("path");
const setAlias = (dir) => path.resolve(__dirname, dir);
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        utils: setAlias("src/assets/utils"),
        assets: setAlias("src/assets"),
        scss: setAlias("src/assets/scss"),
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: "@import 'src/assets/scss/variables/index.scss';",
      },
    },
  },
})
