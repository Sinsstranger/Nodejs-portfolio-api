const router = require('express').Router();
const StackController = require('../controllers/StackController');

router.get('/', StackController.getAll);
router.get('/:id', StackController.getById);
router.post('/', StackController.create);
router.patch('/:id', StackController.update);
router.delete('/:id', StackController.delete);

module.exports = router;