module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  // 它支持webPack-dev-server的所有选项
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: {
    //
    // }
  }
};
