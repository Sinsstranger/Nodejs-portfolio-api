const router = require('express').Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.getById);
router.post('/', ProjectController.create);
router.patch('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

module.exports = router;