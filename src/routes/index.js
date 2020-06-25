const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('MainUser/home');
});

module.exports = router;