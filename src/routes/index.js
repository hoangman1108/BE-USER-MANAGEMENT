"use strict";
const userRoute = require('./user.routes');
const homeRoute = require('./home.routes');
const express = require('express');
const router = express.Router();
router.use('/users', userRoute);
router.use('/', homeRoute);
module.exports = router;