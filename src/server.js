const express = require('express');
const server = express();
const port = 3333;

server.listen(port);
server.use(express.static('public'));

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server.get('/', (_, response) => {
  return response.render('index.html');
});

server.get('/create-point', (_, response) => {
  return response.render('create-point.html');
});

server.get('/search', (_, response) => {
  return response.render('search-results.html');
});
