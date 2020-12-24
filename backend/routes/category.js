const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/category');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategories);
router.get('/:id', controller.getByCategoryId);
router.post('/', controller.createCategory);
router.patch('/:id', controller.updateCategory);
router.delete('/:id', controller.removeCategory);

module.exports = router;
