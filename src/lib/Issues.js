
const express = require('express');
const router = express.Router();


const pool = require('../database');


router.get('/Acceso',(req, res, next)=>{
    const {ID_Privilegio}=req.body;
if(ID_Privilegio==1){ 
}

})(req,res,next);


module.exports = router;