const express = require('express');

const { loginAccount } = require('../controllers/accountsController');

const router = express.Router();

router.route('/login')
    .post(loginAccount);

module.exports = router;
