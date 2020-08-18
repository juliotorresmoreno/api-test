
const migrations = require('./migrations');
const db = require('../db');

const conn = db.getOrCreateConn();

(async function () {
  await migrations(conn);
  console.log('Migracion exitosa.')
  process.exit(0);
})();
