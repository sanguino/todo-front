const proxy = require('http-proxy-middleware');

var rewriteFn = function(path, req) {
  console.log(path, path.replace('/api', ''));
  return path.replace('/api', '');
};

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:3000', // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
      pathRewrite: rewriteFn,
    }),
  );
};
