const express = require('express');

const { registerUser } = require('../controllers/usersController');

const router = express.Router();

router.route('/users')
    .post(registerUser);

module.exports = router;
