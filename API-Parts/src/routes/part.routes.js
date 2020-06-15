const router = require('express-promise-router')();
const partController = require('../controllers/part.controller');

// ==> Definindo as rotas do CRUD - 'Insumo':

// ==> Rota responsável por criar um novo 'Insumo': (POST): localhost:3000/api/parts
router.post('/part', partController.createPart);

// ==> Rota responsável por listar todos os 'parts': (GET): localhost:3000/api/parts
router.get('/parts', partController.listAllParts);

// ==> Rota responsável por selecionar 'Insumo' pelo 'Id': (GET): localhost:3000/api/parts/:id
router.get('/part/:id', partController.findPart);

router.get('/partsLike/name/:name', partController.findPartsLike);

// ==> Rota responsável por atualizar 'Insumo' pelo 'Id': (PUT): localhost: 3000/api/parts/:id
router.put('/part/:id', partController.updatePart);

// ==> Rota responsável por excluir 'Insumo' pelo 'Id': (DELETE): localhost:3000/api/parts/:id
router.delete('/part/:id', partController.deletePart);

module.exports = router;
