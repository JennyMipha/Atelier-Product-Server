const db = require('../../database/index');

module.exports = {
  getProducts: (page, count) => {
    console.log('IN MODEL, getProducts, page = ', page, 'count = ', count);
    return new Promise((resolve, reject) => {
      db.pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${(page - 1) * count}`)
      .then((result) => {
        console.log("IN MODEL, getProduct, DB CONNECT SUCCESS! result.rows = ", result.rows);
        resolve(result.rows);
      })
      .catch((err) => {
        console.log("IN MODEL, getProduct, DB CONNECT FAILED. err = ", err);
        reject(err);
      })
    });
  },
  getProductInfo: () => {
    console.log('IN MODEL, getProductInfo');
    db.pool.query()
    .then((client) => {
      console.log("IN MODEL, getProductInfo, DB CONNECT SUCCESS!")
    })
    .catch((err) => {
      console.log("IN MODEL, getProductInfo, DB CONNECT FAILED. err = ", err);
    })
  },
  getProductStyles: () => {
    console.log('IN MODEL, getProductStyles, productId = ', req.params.product_id);
  },
  getRelatedProducts: () => {
    console.log('IN MODEL, getRelatedProducts, productId = ', req.params.product_id);
  },

}