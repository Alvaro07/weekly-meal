module.exports = {
  publicPath: "weekly-meal",
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/styles/settings/_variables.scss";
        @import "@/styles/settings/_mixins.scss";
        `
      }
    }
  }
};
