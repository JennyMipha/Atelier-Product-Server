import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  // vus: 1,
  // duration: '10s',
  stages: [
    { duration: '2s', target: 100 }, // below normal load
    { duration: '5s', target: 100 },
    { duration: '2s', target: 200 }, // normal load
    { duration: '5s', target: 200 },
    { duration: '2s', target: 300 }, // around the breaking point
    { duration: '5s', target: 300 },
    { duration: '2s', target: 400 }, // beyond the breaking point
    { duration: '5s', target: 400 },
    { duration: '10s', target: 0 }, // scale down, recovery stage
  ],
  // scenarios: {
  //   constant_request_rate: {
  //     executor: 'constant-arrival-rate',
  //     rate: 1000,
  //     timeUnit: '1s',
  //     duration: '30s',
  //     preAllocatedVUs: 500,
  //     maxVUs: 2000,
  //   },
  // },
};

const API_URL = 'http://localhost:3000';
const productId = 2;

export default () => {
  http.get(`${API_URL}/products`);
  http.get(`${API_URL}/products/${productId}`);
  http.get(`${API_URL}/products/${productId}`);
  http.get(`${API_URL}/products/${productId}`);
  // http.batch([
  //   ['GET', `${API_URL}/products/${productId}/related`],
  // ]);
  // sleep(1);
};
