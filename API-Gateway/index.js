const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');

var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const openApiDocumentation = require('./openApiDocumentation');
var cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

const {
  AUTHORIZATION_API_URL,
  USERS_API_URL,
  INCIDENTS_API_URL,
  MANAGER_NCS_API_URL,
  PARTS_API_URL,
  NC_API_URL,
} = require('./urls');

const authorizationServiceProxy = httpProxy(AUTHORIZATION_API_URL);
const userServiceProxy = httpProxy(USERS_API_URL);
const incidentServiceProxy = httpProxy(INCIDENTS_API_URL);
const managerNCsServiceProxy = httpProxy(MANAGER_NCS_API_URL);
const partServiceProxy = httpProxy(PARTS_API_URL);
const ncServiceProxy = httpProxy(NC_API_URL);

app.get('/', (req, res) => res.send('Gateway API'));

app.get('/auth/verifyJWT', (req, res, next) =>
  authorizationServiceProxy(req, res, next)
);
app.post('/auth/login', (req, res, next) =>
  authorizationServiceProxy(req, res, next)
);

app.get('/api/users', verifyJWT, (req, res, next) =>
  userServiceProxy(req, res, next)
);
app.post('/api/validateuser', (req, res, next) =>
  userServiceProxy(req, res, next)
);

app.get('/api/incidents', (req, res, next) =>
  incidentServiceProxy(req, res, next)
);
app.post('/api/incident', (req, res, next) =>
  incidentServiceProxy(req, res, next)
);

app.get('/api/parts', (req, res, next) => partServiceProxy(req, res, next));
app.get('/api/partsLike/name/:name', (req, res, next) =>
  partServiceProxy(req, res, next)
);
app.post('/api/part', (req, res, next) => partServiceProxy(req, res, next));

app.get('/api/ncs', (req, res, next) => ncServiceProxy(req, res, next));

app.get('/managerNC/incidentesNCs', (req, res, next) =>
  managerNCsServiceProxy(req, res, next)
);
app.get('/managerNC/incidentes', (req, res, next) =>
  managerNCsServiceProxy(req, res, next)
);
app.post('/managerNC/incidenteInsumo', (req, res, next) =>
  managerNCsServiceProxy(req, res, next)
);

function verifyJWT(req, res, next) {
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

    req.userId = decoded.id;
    console.log('User Id: ' + decoded.id);
    next();
  });
}

app.listen(port, () => console.log(`Gateway API listening on port ${port}!`));
