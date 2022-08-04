import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  // vus: 1,
  // duration: '10s',
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 2000 }, // spike to 2000 users
    { duration: '3m', target: 2000 }, // stay at 2000 users for 3 minutes
    { duration: '10s', target: 100 }, // scale down, recovery stage
    { duration: '3m', target: 100 },
    { duration: '10m', target: 0 },
  ],
};

const API_URL = 'http://localhost:3000';

export default () => {
  http.batch([
    ['GET', `${API_URL}/products`],
  ]);
  sleep(1);
};
