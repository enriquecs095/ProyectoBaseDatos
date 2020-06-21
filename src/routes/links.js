const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('links/add');
});

router.post('/add', async (req,res)=> {
    const {Title,Detalles_de_Proyecto,ID_Cliente}=req.body;
    console.log(req.body);
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
    var sql = "INSERT INTO Solicitud_Proyecto (Nombre_Proyecto, Descripcion_Proyecto,ID_cliente_solicita,Estado_Solicitud,Fecha_Solicitud) VALUES ('"+Title+"','"+Detalles_de_Proyecto+"','"+ID_Cliente+"','0','"+date+"')";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    console.log("1 record inserted");
    req.flash('success','Solicitud Agregada');
    res.redirect('/links');
  });
});

router.get('/', async (req,res)=> {
    const links = await pool.query('SELECT * FROM Proyectos');
    const links1 = await pool.query('SELECT * FROM Solicitud_Proyecto');
    res.render('links/list', {links1,links});
});

router.get('/negar/:ID_Solicitud', async(req,res)=>{
    const {ID_Solicitud}= req.params;
    var sql = "UPDATE Solicitud_Proyecto SET Estado_Solicitud = '-1' WHERE ID_Solicitud = '"+ID_Solicitud+"'";
    await pool.query(sql, function (err, result) {
        if (err) throw err;
    console.log("1 record updated");
    req.flash('success','Solicitud Negada');
    res.redirect('/links');
    });
});

router.get('/aceptar/:ID_Solicitud', async(req,res) => {
    const {ID_Solicitud} = req.params;
    console.log(ID_Solicitud);
    const links = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE ID_Solicitud=? ',[ID_Solicitud]);
    const links1 = await pool.query('SELECT * FROM Equipo_Trabajo');
    console.log(links);
    console.log(links1);
    res.render('links/aceptar', {links:links[0],links1});
});

router.post('/aceptar/:ID_Solicitud', async (req,res)=> {
    const {Nombre,Tecnologias,presupuesto,url_trello,url_github,ET,Etiqueta,Entrega,Inicio,Encargado,ID_Solicitud,Nombre_Proyecto}=req.body;
    console.log(req.body);
    const asd = await pool.query("INSERT INTO Proyectos (Nombre, Conjunto_Tecnologia,Presupuesto,Esta_Asignado,Pseudo_Nombre,URL_Proy_Github,URL_Proy_Trello,ID_Etiqueta,ID_Equipo_Trabajo,ID_Jefe_Encargado,Fecha_Inicio,Fecha_Entrega,Id_solicitud) VALUES ('"+Nombre_Proyecto+"','"+Tecnologias+"','"+presupuesto+"','1','"+Nombre+"','"+url_github+"','"+url_trello+"','"+Etiqueta+"','"+ET+"','"+Encargado+"','"+Inicio+"','"+Entrega+"','"+ID_Solicitud+"')");
    console.log("1 record inserted");
    const link= await pool.query("UPDATE Solicitud_Proyecto SET Estado_Solicitud = '1' WHERE ID_Solicitud = '"+ID_Solicitud+"'");
    console.log("1 record updated");
    req.flash('success','Solicitud Aceptada');
    res.redirect('/links');
  
});

router.get('/historial/:ID_Proyecto', async(req,res) => {
    const {ID_Proyectos} = req.params;
    const links = await pool.query('SELECT * FROM Proyectos WHERE ID_Proyectos=? ',[ID_Proyectos]);
    const links1 = await pool.query('SELECT * FROM Equipo_Trabajo');
    console.log(links);
    res.render('links/historial', {links:links[0],links1});
});




module.exports = router;