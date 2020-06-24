"use strict";
const express = require('express');
const router = express.Router();
const jwt = require('../utils/jsonwebtoken');

router.get('/',jwt.authenticateAccessToken,(req,res)=>{
    console.log(res.users);
    res.send(req.user);
})

module.exports = router;