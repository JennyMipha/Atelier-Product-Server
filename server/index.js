require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
// check
app.use(express.urlencoded({
  extended: true,
}));

const PORT = process.env.PORT || 3000;

app.get('/products', routes.getProducts);
app.get('/products/:product_id', routes.getProductInfo);
app.get('/products/:product_id/styles', routes.getProductStyles);
app.get('/products/:product_id/related', routes.getRelatedProducts);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
