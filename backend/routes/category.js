const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/category');
const upload = require('../middleware/upload');

router.get(
    '/',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.getAllCategories
);
router.get(
    '/:id',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.getByCategoryId
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    upload.single('image'),
    controller.createCategory
);
router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    upload.single('image'),
    controller.updateCategory
);
router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.removeCategory
);

module.exports = router;
