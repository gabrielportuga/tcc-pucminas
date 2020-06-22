//index.js
var http = require('http');
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');

const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//rota protegida
app.get('/auth/verifyJWT', (req, res, next) => {
  verifyJWT(req, res, next);
});

//rota de login
app.post('/auth/login', (req, res, next) => {
  const data = req.body;
  authenticate(data).then((bufferOne) => {
    if (bufferOne) {
      //auth ok
      var buffer = Buffer.from(bufferOne);
      let user = buffer.toString('utf-8');
      user = JSON.parse(user);
      const id = user.id;
      if (user.valid === undefined ) {
        filePath = path.join(__dirname, 'private.key');

        var privateKey = fs.readFileSync(filePath, 'utf8');
        var token = jwt.sign({ id }, privateKey, {
          expiresIn: 1800, // 23min
          algorithm: 'RS256', //SHA-256 hash signature
        });

        console.log('Fez login e gerou token!');
        return res.status(200).send({ user: user, token: token });
      }
    }

    return res.status(401).send({ user: '', token: '', message:'Login inválido!'});
  });
});

//rota de logout
app.post('/logout', function (req, res) {
  console.log('Fez logout e cancelou o token!');
  res.status(200).send({ auth: false, token: null });
});

function authenticate(data) {
  return new Promise((resolve, reject) => {
    let dataEncoded = JSON.stringify(data);
    let req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/validateuser',
        method: 'POST',
        headers: {
          'Content-Length': Buffer.byteLength(dataEncoded),
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let buffers = [];
        res.on('error', reject);
        res.on('data', (buffer) => buffers.push(buffer));
        res.on('end', () => resolve(Buffer.concat(buffers)));
      }
    );
    req.write(dataEncoded);
    req.end();
  });
}

//função que verifica se o JWT é ok
const verifyJWT = (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: 'Token não informado.' });

  filePath = path.join(__dirname, 'public.key');
  var publicKey = fs.readFileSync(filePath, 'utf8');
  jwt.verify(token, publicKey, { algorithm: ['RS256'] }, function (
    err,
    decoded
  ) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Token inválido.' });

    return res.status(200).send({ auth: true, message: 'Token válido.' });
  });
};

var server = http.createServer(app);
server.listen(3100);
console.log('Servidor escutando na porta 3100...');
