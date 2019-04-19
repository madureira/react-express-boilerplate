require('@babel/polyfill');
require('@babel/register');

const ENV = process.env.NODE_ENV || process.argv[2] || 'development';

if (ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

require('./server');
