require('dotenv').config();

const PORT = process.env.PORT || 3000;
const request = require('supertest')(`http://localhost:${PORT}`);
const { expect } = require('chai');
const { describe, it, before } = require('mocha');

const productId = Math.floor(Math.random() * 1000);

describe('GET products', () => {
  let error;
  let response;

  before((done) => {
    request.get('/products').end((err, res) => {
      // console.log('response', res);
      error = err;
      response = res;
      done();
    });
  });
  it('should return 5 products if count is not specified', () => {
    expect(response.body.length).to.equal(5);
  });
  it('should return a 200 status code if success', () => {
    // const response = await request.get('/products');
    expect(response.status).to.equal(200);
  });
});

describe('GET product info', () => {
  let error;
  let response;

  before((done) => {
    request.get(`/products/${productId}`).end((err, res) => {
      error = err;
      response = res;
      done();
    });
  });
  it('should return the product information of the provided productID', () => {
    expect(response.body.id).to.equal(productId);
  });
  it('should return a 200 status code if success', () => {
    expect(response.status).to.equal(200);
  });
});

describe('GET product styles', () => {
  let error;
  let response;

  before((done) => {
    request.get(`/products/${productId}/styles`).end((err, res) => {
      error = err;
      response = res;
      done();
    });
  });
  it('should return the product information of the provided productID', () => {
    expect(response.body.product_id).to.equal(`${productId}`);
  });
  it('should return a 200 status code if success', () => {
    expect(response.status).to.equal(200);
  });
});

describe('GET related products', () => {
  let error;
  let response;

  before((done) => {
    request.get(`/products/${productId}/related`).end((err, res) => {
      error = err;
      response = res;
      done();
    });
  });
  it('should return a 200 status code if success', () => {
    expect(response.status).to.equal(200);
  });
});
