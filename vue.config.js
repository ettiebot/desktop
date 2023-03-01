const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // outputDir: __dirname + "/dist",
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "@": __dirname,
  //     },
  //   },
  //   entry: {
  //     app: "./main.js",
  //   },
  // },
  pluginOptions: {
    electronBuilder: {
      appId: "com.ettiebot.ettie",
      copyright: "Copyright © 2023 ettie.uk",
    },
  },
});
