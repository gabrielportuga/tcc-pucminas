const router = require('express-promise-router')();
const ncController = require('../controllers/nc.controller');

// ==> Definindo as rotas do CRUD - 'nc':

// ==> Rota responsável por criar um novo 'nc': (POST): localhost:3000/api/ncs
router.post('/nc', ncController.createNc);

// ==> Rota responsável por listar todos os 'ncs': (GET): localhost:3000/api/ncs
router.get('/ncs', ncController.listAllNcs);

// ==> Rota responsável por selecionar 'nc' pelo 'Id': (GET): localhost:3000/api/ncs/:id
router.get('/nc/:id', ncController.findNc);

// ==> Rota responsável por atualizar 'nc' pelo 'Id': (PUT): localhost: 3000/api/ncs/:id
router.put('/nc/:id', ncController.updateNc);

// ==> Rota responsável por excluir 'nc' pelo 'Id': (DELETE): localhost:3000/api/ncs/:id
router.delete('/nc/:id', ncController.deleteNc);

module.exports = router;
