const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');

router.get('/', ReviewController.getAll);
router.get('/:id', ReviewController.getById);
router.post('/', ReviewController.create);
router.patch('/:id', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = router;