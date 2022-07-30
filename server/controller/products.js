const model = require('../model/products');

module.exports = {
  getProducts: (req, res) => {
    console.log('IN CONTROLLER, getProducts');
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    model.getProducts(page, count)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log('IN CONTROLLER, getProducts err = ', err);
        res.status(501).send();
      });
  },
  getProductInfo: (req, res) => {
    console.log('IN CONTROLLER, getProductInfo, productId = ', req.params.product_id);
    model.getProductInfo();
  },
  getProductStyles: (req, res) => {
    console.log('IN CONTROLLER, getProductStyles, productId = ', req.params.product_id);
  },
  getRelatedProducts: (req, res) => {
    console.log('IN CONTROLLER, getRelatedProducts, productId = ', req.params.product_id);
  },

}