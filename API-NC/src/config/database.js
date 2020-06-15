const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};