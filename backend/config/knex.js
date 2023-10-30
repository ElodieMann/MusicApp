//knex.js
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'maju1429',
    database: 'musicapp',
    port: 5433,
  },
});

module.exports = db;