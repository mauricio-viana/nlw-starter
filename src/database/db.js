const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
//db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       address TEXT,
//       complement TEXT,
//       state TEXT,
//       city TEXT,
//       image TEXT,
//       items TEXT
//     );
//   `);

//   const query = `
//     INSERT INTO places(
//       name,
//       address,
//       complement,
//       state,
//       city,
//       image,
//       items
//     ) VALUES (?,?,?,?,?,?,?)
//   `;

//   // prettier-ignore
//   const values = [
//     'Papersider',
//     'Guilerme Gemballa, Jardim América',
//     'Nº 260',
//     'Santa Catarina',
//     'Rio do Sul',
//     'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//     'Papéis e Papelão'];

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Cadastro com sucesso');
//     console.log(this);
//   }

//   // db.run(query, values, afterInsertData);

//   // db.all(`SELECT * FROM places`, function (err, rows) {
//   //   if (err) {
//   //     return console.log(err);
//   //   }
//   //   console.log('Aqui estão seus registros: ');
//   //   console.log(rows);
//   // });

//   db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Registro deletado com sucesso!');
//   });
// });
