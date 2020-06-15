const dotenv = require('dotenv');
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '../.././.env.example') });

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};