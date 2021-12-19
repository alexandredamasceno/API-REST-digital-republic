const express = require('express');

const { registerAccount } = require('../controllers/accountsController');

const router = express.Router();

router.route('/account')
    .post(registerAccount);

module.exports = router;
