const express = require('express');
const router = express.Router();

const controller = require('../controllers/category')

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getByCategoryId);
router.post('/', controller.createCategory);
router.patch('/:id', controller.updateCategory);
router.delete('/:id', controller.removeCategory);

module.exports = router;
