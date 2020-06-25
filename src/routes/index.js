const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('MainUser/home');
});

router.post('/signinid',(req,res)=>{  
    res.render('auth/signin');
});

router.post('/signupid',(req,res)=>{  
    res.render('auth/signup');
});

module.exports = router;