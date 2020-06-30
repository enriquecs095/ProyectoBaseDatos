const express = require('express');
const router = express.Router();


const pool = require('../database');


router.post('/add', async (req,res)=> {
    const {Title,Detalles_de_Proyecto}=req.body;
    const{ID_Usuario}=req.user;
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    const ncliente = await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
    const client = ncliente[0];
    var sql = "INSERT INTO Solicitud_Proyecto (Nombre_Proyecto, Descripcion_Proyecto,ID_cliente_solicita,Estado_Solicitud,Fecha_Solicitud) VALUES ('"+Title+"','"+Detalles_de_Proyecto+"','"+client.Codigo_Clientes+"','0','"+date+"')";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Agregada');
    res.redirect('/Solicitar%20Proyecto');
  });
});


//aqui niego la solicitud
router.get('/negar/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '2' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Negada');
    res.redirect('/Gestionar%20Solicitudes');
    });
});


//aqui apruebo la solicitud
router.get('/aprobar/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '1' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Aprobada');
    res.redirect('/Gestionar%20Solicitudes');
    });
});


//aqui borro la solicitud
router.get('/cancelar/:ID_Solicitud', async(req,res)=>{//borro la solicitud proyecto
    const {ID_Solicitud}= req.params;
    var sql = "DELETE from Solicitud_Proyecto WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud eliminada');
    res.redirect('/Solicitudes%20Proyectos');
    });
});


/*
//aqui veo el proyecto y el equipo de trabajo
router.get('/historial/:ID_Proyecto', async(req,res) => {
    const {ID_Proyectos} = req.params;
    const links = await pool.query('SELECT * FROM Proyectos WHERE ID_Proyectos=? ',[ID_Proyectos]);
    const links1 = await pool.query('SELECT * FROM Equipo_Trabajo');
    console.log(links);
    res.render('links/historial', {links:links[0],links1});
});*/


  
module.exports = router;