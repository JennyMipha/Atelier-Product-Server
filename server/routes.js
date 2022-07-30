const controller = require('./controller/products');
const model = require('./model/products');

module.exports = {
  getProducts: (req, res) => {
    console.log('IN ROUTE, getProducts');
    controller.getProducts(req, res);
  },
  getProductInfo: (req, res) => {
    console.log('IN ROUTE, getProductInfo, productId = ', req.params.product_id);
    controller.getProductInfo(req, res);
  },
  getProductStyles: (req, res) => {
    console.log('IN ROUTE, getProductStyles, productId = ', req.params.product_id);
  },
  getRelatedProducts: (req, res) => {
    console.log('IN ROUTE, getRelatedProducts, productId = ', req.params.product_id);
  },

}