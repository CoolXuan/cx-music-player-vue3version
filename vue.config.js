module.exports = {
  devServer: {
    hot:true,
    host: 'localhost',
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js')
    proxy: {
      "/apis": {//代理
        target: 'http://localhost:5000',//目标接口域名
        changeOrigin: true,//是否跨域
        pathRewrite: {
          "^/apis": "", //重写接口
        },
      },
    },
    disableHostCheck: true
  }
}