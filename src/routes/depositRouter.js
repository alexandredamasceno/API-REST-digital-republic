const express = require('express');

const router = express.Router();

const { makeDeposit } = require('../controllers/accountsController');
const { validateToken } = require('../token/index');

router.route('/deposit')
    .post(validateToken, makeDeposit);

module.exports = router;
