const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth')

// localhost:8080/api/auth/login
router.post('/login', authController.login)

// localhost:8080/api/auth/register
router.post('/register', authController.register)

module.exports = router;
