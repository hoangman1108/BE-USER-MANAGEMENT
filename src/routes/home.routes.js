const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("1111");
})

module.exports = router;