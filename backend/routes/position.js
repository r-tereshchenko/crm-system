const express = require('express');
const router = express.Router();

const controller = require('../controllers/position')

router.get('/:categoryId', controller.getPositionsByCategoryId)
router.post('/', controller.createPosition)
router.patch('/:id', controller.updatePosition)
router.delete('/:id', controller.removePosition)

module.exports = router;
