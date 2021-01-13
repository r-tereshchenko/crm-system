const express = require('express');
const passport = require('passport')
const router = express.Router();

const controller = require('../controllers/analytics')

router.get(
    '/overview',
    passport.authenticate('jwt', {session: false}, null),
    controller.overview
)
router.get(
    '/analytics',
    passport.authenticate('jwt', {session: false}, null),
    controller.analytics
)


module.exports = router
