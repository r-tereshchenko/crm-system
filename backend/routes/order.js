const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/order');


router.get(
    '/',
    passport.authenticate('jwt', {session: false}, null),
    controller.getAllOrders
);
router.post(
    '/',
    passport.authenticate('jwt', {session: false}, null),
    controller.createOrder
);

module.exports = router;
