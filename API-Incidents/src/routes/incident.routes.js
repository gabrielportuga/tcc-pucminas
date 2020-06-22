const router = require('express-promise-router')();
const incidentController = require('../controllers/incident.controller');

// ==> Definindo as rotas do CRUD - 'incident':

// ==> Rota responsável por criar um novo 'incident': (POST): localhost:3000/api/incidents
router.post('/incident', incidentController.createIncident);

// ==> Rota responsável por listar todos os 'incidents': (GET): localhost:3000/api/incidents
router.get('/incidents', incidentController.listAllIncidents);

// ==> Rota responsável por selecionar 'incident' pelo 'Id': (GET): localhost:3000/api/incidents/:id
router.get('/incident/:id', incidentController.findIncident);

router.get('/incidentInsumosNcs/:id', incidentController.findIncidentPartsNCs);

// ==> Rota responsável por atualizar 'incident' pelo 'Id': (PUT): localhost: 3000/api/incidents/:id
router.put('/incident/:id', incidentController.updateIncident);

// ==> Rota responsável por excluir 'incident' pelo 'Id': (DELETE): localhost:3000/api/incidents/:id
router.delete('/incident/:id', incidentController.deleteIncident);

module.exports = router;
