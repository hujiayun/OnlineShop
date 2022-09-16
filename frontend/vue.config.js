module.exports = {
  devServer: {
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        // 取出/api到后端就没有/api
        pathRewrite:{
          '^/api':'' // 命中代理后, 去掉/api
        }
      }
    }
  },
  pages: {
    main: {
      entry: "src/pages/main/main.js",
      template: "public/index.html",
      title: "SellPhone - Main",
      chunks: ["chunk-vendors", "chunk-common", "main"],
    },
    session: {
      entry: "src/pages/session/main.js",
      template: "public/index.html",
      title: "SellPhone - Session",
      chunks: ["chunk-vendors", "chunk-common", "session"],
    },
    checkout: {
      entry: "src/pages/checkout/main.js",
      template: "public/index.html",
      title: "SellPhone - Checkout",
      chunks: ["chunk-vendors", "chunk-common", "checkout"],
    },
    user: {
      entry: "src/pages/user/main.js",
      template: "public/index.html",
      title: "SellPhone - User",
      chunks: ["chunk-vendors", "chunk-common", "user"],
    },
    404: {
      entry: "src/pages/notfound/main.js",
      template: "public/index.html",
      title: "SellPhone - 404",
      chunks: ["chunk-vendors", "chunk-common", "404"],
    },
  },
};
