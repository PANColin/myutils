const proxy = require("http-proxy-middleware");

module.exports = {
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8080",
    proxy: {
      "/simpleWeather/query": {
        target: "http://apis.juhe.cn", // 请求服务器根路径,这里必须加上 http/https://
        changeOrigin: true, // 是否跨域
        ws: true, // websocket
        pathRewrite: {
          // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
          "^/simpleWeather/query": "/simpleWeather/query",
        },
      },
      "/constellation/getAll": {
        target: "http://web.juhe.cn", // 请求服务器根路径,这里必须加上 http/https://
        changeOrigin: true, // 是否跨域
        ws: true, // websocket
        pathRewrite: {
          // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
          "^/constellation/getAll": "/constellation/getAll",
        },
      },
      "/fapig/sudoku/generate": {
        target: "http://apis.juhe.cn", // 请求服务器根路径,这里必须加上 http/https://
        changeOrigin: true, // 是否跨域
        ws: true, // websocket
        pathRewrite: {
          // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
          "^/fapig/sudoku/generate": "/fapig/sudoku/generate",
        },
      },
      "/qqevaluate/qq": {
        target: "http://japi.juhe.cn", // 请求服务器根路径,这里必须加上 http/https://
        changeOrigin: true, // 是否跨域
        ws: true, // websocket
        pathRewrite: {
          // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
          "^/qqevaluate/qq": "/qqevaluate/qq",
        },
      },
    },
  },
  //...
};
