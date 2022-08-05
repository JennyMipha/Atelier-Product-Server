const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  connectionTimeoutMillis: 1000,
});

// let connect = pool.connect()
// .then(() => {
//   console.log('SUCCESS!');
// })
// .catch((err) => {
//   console.log('CONNECT FAILED, err = ', err);
// });

exports.pool = pool;
