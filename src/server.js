const express = require('express');
const server = express();
const port = 3333;
const db = require('./database/db');

server.listen(port);
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server.get('/', (_, res) => {
  return res.render('index.html');
});

server.get('/create-point', (_, res) => {
  return res.render('create-point.html');
});

server.post('/savepoint', (req, res) => {
  const query = `
    INSERT INTO places(
      name,
      address,
      complement,
      state,
      city,
      image,
      items
    ) VALUES (?,?,?,?,?,?,?)
  `;

  const values = [
    req.body.name,
    req.body.address,
    req.body.complement,
    req.body.state,
    req.body.city,
    req.body.image,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro!');
    }
    console.log('Cadastro com sucesso');
    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {
  const search = req.query.search;
  if (search == '') {
    return res.render('search-results.html', { total: 0 });
  }

  // prettier-ignore
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}'`, function (err,rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;
    return res.render('search-results.html', { places: rows, total });
  });
});
