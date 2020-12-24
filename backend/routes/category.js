const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/category');
const upload = require('../middleware/upload');

router.get(
    '/',
    passport.authenticate('jwt', {session: false}, null),
    controller.getAllCategories
);
router.get(
    '/:id',
    passport.authenticate('jwt', {session: false}, null),
    controller.getByCategoryId
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}, null),
    upload.single('image'),
    controller.createCategory
);
router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}, null),
    upload.single('image'),
    controller.updateCategory
);
router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}, null),
    controller.removeCategory
);

module.exports = router;
