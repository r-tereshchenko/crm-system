const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/position')

router.get(
    '/:categoryId',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.getPositionsByCategoryId
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.createPosition
);
router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.updatePosition
);
router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.removePosition
);

module.exports = router;
