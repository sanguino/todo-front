/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./mocks/api.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/auth', (req, res, next) => {
  if (req.method === 'POST') {
    req.method = 'GET';
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
