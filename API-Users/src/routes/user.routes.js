const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

// ==> Definindo as rotas do CRUD - 'user':

// ==> Rota responsável por criar um novo 'user': (POST): localhost:3000/api/users
router.post('/user', userController.createUser);

// ==> Rota responsável por listar todos os 'users': (GET): localhost:3000/api/users
router.get('/users', userController.listAllUsers);

// ==> Rota responsável por selecionar 'user' pelo 'Id': (GET): localhost:3000/api/users/:id
router.get('/user/:id', userController.findUser);

// ==> Rota responsável por atualizar 'user' pelo 'Id': (PUT): localhost: 3000/api/users/:id
router.put('/user/:id', userController.updateUser);

// ==> Rota responsável por excluir 'user' pelo 'Id': (DELETE): localhost:3000/api/users/:id
router.delete('/user/:id', userController.deleteUser);

// ==> Rota responsável por criar um novo 'user': (POST): localhost:3000/api/users
router.post('/validateuser', userController.validateUser);

module.exports = router;
