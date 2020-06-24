"use strict";
const express = require('express');
const router = express.Router();
const check = require('../components/auth');
const validate = require('../utils/validateRequest');
const {authenticateRefreshToken} = require('../utils/jsonwebtoken');
const auth = require('../components/auth');

router.post('/login',validate.account, check.account);
router.post('/logout',);
router.post('/refresh-token',authenticateRefreshToken);

module.exports = router;