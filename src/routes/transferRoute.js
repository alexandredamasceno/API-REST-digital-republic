const express = require('express');

const router = express.Router();

const { makeTransfer } = require('../controllers/accountsController');
const { validateToken } = require('../token/index');

router.route('/transfer')
    .post(validateToken, makeTransfer);

module.exports = router;
