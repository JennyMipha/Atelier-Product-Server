const db = require('../../database/index');

module.exports = {
  getProducts: (page, count) => {
    console.log('IN MODEL, getProducts, page = ', page, 'count = ', count);
    return new Promise((resolve, reject) => {
      db.pool.query(`SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${(page - 1) * count}`)
        .then((result) => {
          console.log('IN MODEL, getProduct, DB CONNECT SUCCESS! result.rows = ', result.rows);
          resolve(result.rows);
        })
        .catch((err) => {
          console.log('IN MODEL, getProduct, DB CONNECT FAILED. err = ', err);
          reject(err);
        });
    });
  },
  getProductInfo: (id) => {
    console.log('IN MODEL, getProductInfo, id = ', id);
    return new Promise((resolve, reject) => {
      db.pool.query(`SELECT
        *,
        (SELECT json_agg(json_build_object(
          'feature', feature,
          'value', value))
          FROM features WHERE product_id=${id})
        AS features
        FROM products WHERE id=${id}`)
        .then((result) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT SUCCESS result.rows = ', result.rows);
          resolve(result.rows[0]);
        })
        .catch((err) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT FAILED. err = ', err);
          reject(err);
        });
    });
  },
  getProductStyles: (id) => {
    console.log('IN MODEL, getProductStyles, id = ', id);
    return new Promise((resolve, reject) => {
      db.pool.query(`SELECT array_agg(json_build_object(
        'style_id', styles.styled_id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style,
        'photos', (SELECT json_agg(json_build_object(
            'thumbnail_url', photos.thumbnail_url,
            'url', photos.url))
          FROM photos
          WHERE photos.styled_id = styles.styled_id),
        'skus', (SELECT json_object_agg(
            skus.id,
            json_build_object(
              'quantity', skus.quantity,
              'size', skus.size))
          FROM skus
          WHERE skus.styled_id = styles.styled_id)))
      AS results
      FROM styles
      WHERE styles.product_id = ${id}`)
        .then((result) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT SUCCESS result.rows = ', result.rows[0].results);
          const obj = {
            product_id: id,
            results: result.rows[0].results,
          };
          resolve(obj);
        })
        .catch((err) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT FAILED. err = ', err);
          reject(err);
        });
    });
  },
  getRelatedProducts: (id) => {
    console.log('IN MODEL, getRelatedProducts, id = ', id);
    return new Promise((resolve, reject) => {
      db.pool.query(`SELECT
        array_agg(related_product_id)
      AS result FROM related WHERE product_id=${id}`)
        .then((result) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT SUCCESS result.rows = ', result.rows[0].result);
          resolve(result.rows[0].result);
        })
        .catch((err) => {
          console.log('IN MODEL, getProductInfo, DB CONNECT FAILED. err = ', err);
          reject(err);
        });
    });
  },
};
