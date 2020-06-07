import sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database('./src/database/database.db');

export default db;

db.serialize(() => {
  // db.run(`DROP TABLE places`, function (error) {
  //   if (error) {
  //     return console.log(error.message);
  //   }
  //   console.log('Registro deletado com sucesso!');
  // });

  db.run(`
     CREATE TABLE IF NOT EXISTS places(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT,
       address TEXT,
       complement TEXT,
       state TEXT,
       city TEXT,
       image TEXT,
       items TEXT
     );
   `);
});
