const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('links/add');
});

router.post('/add', async (req,res)=> {
    const {ID_Proyecto,Title,presupuesto,Detalles_de_Proyecto,url_trello,url_github,ET,Inicio,Entrega,Puesto}=req.body;
    var sql = "INSERT INTO Proyectos (ID_Proyectos, ID_Etiqueta, ID_Puesto_Encargado) VALUES ('"+ID_Proyecto+"','8000000001','PE1')";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    console.log("1 record inserted");
    res.send('received');
  });
});


module.exports = router;