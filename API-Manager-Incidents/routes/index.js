
const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Manager Inidents'))

router.post('/incidenteInsumo', controllers.createIncidenteNC);
router.get('/incidentesNCs', controllers.getAllIncidentesNCs);
router.get('/incidentes', controllers.getAllIncidentes);
//router.get('/posts/:postId', controllers.getPostById);
//router.put('/posts/:postId', controllers.updatePost);
//router.delete('/posts/:postId', controllers.deletePost);

module.exports = router;