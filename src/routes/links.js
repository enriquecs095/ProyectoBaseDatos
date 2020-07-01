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


//aqui niego la solicitud de proyecto
router.get('/negar/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '2' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Negada');
    res.redirect('/Gestionar%20Solicitudes');
    });
});

//aqui hago la solicitud de proyecto otra vez
router.get('/segundaS/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '0', Fecha_Solicitud= '"+date+"'  WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Hecha');
    res.redirect('/Solicitudes%20Realizadas');
    });
});


//aqui apruebo la solicitud de proyecto
router.get('/aprobar/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '1' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Aprobada');
    res.redirect('/Gestionar%20Solicitudes');
    });
});


//aqui niego la solicitud de actividad
router.get('/negarSA/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Actividad SET Aprobado = '2' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
   await pool.query(sql, function (err, result) {
        if (err) throw err;
    req.flash('success','Solicitud Negada');
    res.redirect('/Gestionar%20Solicitudes');
    });
  });
  
  
  //aqui apruebo la solicitud de actividad
  router.get('/aprobarSA/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    const nSolicitudes =await pool.query('SELECT * FROM Solicitud_Actividad WHERE ID_Solicitud=? ',[ID_Solicitud]);
    solicitud=nSolicitudes[0];
     var seAgrego = await pool.query("INSERT INTO Actividades(Tipo_actividad,ID_Funcionalidad) VALUES ('"+solicitud.Tipo_Actividad+"','"+solicitud.ID_Funcionalidad+"')");
     var sql = "UPDATE Solicitud_Actividad SET Aprobado = '1' WHERE ID_Solicitud = '"+solicitud.ID_Solicitud+"'";
     await pool.query(sql, function (err, result) {
        if (err) throw err; 
       req.flash('success','Solicitud Aprobada');
       res.redirect('/Gestionar%20Solicitudes');
    });
  });


module.exports = router;