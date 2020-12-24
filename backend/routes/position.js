const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/position')

router.get(
    '/:categoryId',
    passport.authenticate('jwt', {session: false}, null),
    controller.getPositionsByCategoryId
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}, null),
    controller.createPosition
);
router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}, null),
    controller.updatePosition
);
router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}, null),
    controller.removePosition
);

module.exports = router;
