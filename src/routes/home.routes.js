const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("123123");
})

module.exports = router;