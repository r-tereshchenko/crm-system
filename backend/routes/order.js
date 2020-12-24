const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/order');


router.get(
    '/',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.getAllOrders
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}, (req, res) => { res.send(req.user.profile) }),
    controller.createOrder
);

module.exports = router;
