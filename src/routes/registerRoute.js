const express = require('express');

const { registerAccount, getAccountInfo } = require('../controllers/accountsController');
const { validateToken } = require('../token/index');

const router = express.Router();

router.route('/account')
    .post(registerAccount)
    .get(validateToken, getAccountInfo);

module.exports = router;
