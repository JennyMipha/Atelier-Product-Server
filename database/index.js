const { Pool } = require('pg');

const pool = new Pool({
  database: 'products',
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