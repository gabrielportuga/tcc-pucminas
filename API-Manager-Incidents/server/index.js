const express = require('express');
const routes = require('../routes');

const server = express();
server.use(express.json());

server.use('/managerNC', routes);

module.exports = server;