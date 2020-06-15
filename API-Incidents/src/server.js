const app = require('./app')
const dotenv = require('dotenv');
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});
