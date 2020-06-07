import express from 'express';
import db from './database/db.js';

const router = express.Router();

router.get('/', (_, res) => {
  return res.render('index.html');
});

router.get('/create-point', (_, res) => {
  return res.render('create-point.html');
});

router.post('/savepoint', (req, res) => {
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

  const { name, address, complement, state, city, image, items } = req.body;
  const values = [name, address, complement, state, city, image, items];

  function afterInsertData(error) {
    if (error) {
      logger.error(`POST /savepoint - ${error.message}`);
      return res.render('create-point.html', { failure: true });
    }
    logger.info(
      `POST /savepoint - name:${name}, address:${address}, complement:${complement}, state:${state}, city:${city}`
    );
    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

router.get('/search', (req, res) => {
  const search = req.query.search;
  if (search == '') {
    return res.render('search-results.html', { total: 0 });
  }

  // prettier-ignore
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error,rows) {
    if (error) {
      logger.error(`GET /search - ${error.message}`);
      return res.render('search-results.html', { total: 0 });
    }

    const total = rows.length;

    logger.error(`GET /search - search: ${search}, results: ${total}`);
    return res.render('search-results.html', { places: rows, total });
  });
});

export default router;
