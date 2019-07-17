const proxy = require('http-proxy-middleware');

var rewriteFn = function(path, req) {
  return path.replace('/api', '');
};

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: rewriteFn,
    }),
    proxy('/auth', {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};
