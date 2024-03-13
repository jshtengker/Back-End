const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '010203',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'BackEnd'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};