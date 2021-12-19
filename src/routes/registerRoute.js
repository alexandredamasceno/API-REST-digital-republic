const express = require('express');

const { registerAccount, getAccountInfo } = require('../controllers/accountsController');
const { validateToken } = require('../token/index');

const router = express.Router();

router.route('/account')
    .get(validateToken, getAccountInfo)
    .post(registerAccount);

module.exports = router;
