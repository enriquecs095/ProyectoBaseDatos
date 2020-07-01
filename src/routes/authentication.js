const express = require('express');
const router = express.Router();

const passport = require('passport');

const pool = require('../database');

router.get('/signup',async (req,res)=>{
    const links = await pool.query('SELECT * FROM Rol');
    res.render('auth/signup',{links:links});
});

router.get('/type',async(req,res)=>{ //escogo que voy a agregar usuario o cliente
  const {ID_Rol,ID_Usuario}=req.user;
   if(ID_Rol == 3){
    res.render('auth/client',{ID_Usuario});
   }else{
     const EQ = await pool.query('SELECT * FROM Equipo_Trabajo');
     res.render('auth/employee',{ID_Usuario,EQ});
   }
});


router.post('/signup',(req,res,next)=> {
   passport.authenticate('local.signup',{
    successRedirect: '/type',
    failureRedirect: '/signup',
    failureFlash:true
  })(req,res,next);
});


router.post('/insertc', async (req,res)=>{//extraigo los datos del formulario cliente
  const {Nombre,Email,telefono}=req.body;
  const{ID_Usuario}=req.user;
  var interno=0;
  const add = await pool.query("INSERT INTO Clientes (ID_Usuario,Nombre,Correo_electronico,Telefonos,Es_interno) VALUES ('"+ID_Usuario+"','"+Nombre+"','"+Email+"','"+telefono+"','"+interno+"')");
  res.redirect('/user');
});


router.post('/insertpe', async (req,res)=>{//extraigo los datos del formulario habilidades
  const {NombrePuesto}=req.body;
  const{ID_Usuario}=req.user;
  var date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2) + ' ' + 
  ('00' + date.getUTCHours()).slice(-2) + ':' + 
  ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
  ('00' + date.getUTCSeconds()).slice(-2);
  const nEmpleado=await pool.query('SELECT Numero_Empleado FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  const seingreso= await pool.query("INSERT INTO Puesto_Empleado(Numero_Empleado,Nombre_Puesto,Fecha_Inicio) VALUES ('"+empleado.Numero_Empleado+"','"+NombrePuesto+"','"+date+"')");
  res.redirect('/user');
});


router.get('/Solicitudes%20Realizadas', async (req,res)=> {//aqui veo las solicitudes y proyectos
  const {ID_Usuario}=req.user;
  const  nCliente=await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
  const cliente=nCliente[0]
  const nSolicitudesD = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='2' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const nSolicitudesP = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='0' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const nSolicitudesA = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='1' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const links = await pool.query('SELECT * FROM Proyectos p inner join Solicitud_Proyecto sp on p.Id_solicitud=sp.ID_Solicitud  WHERE sp.ID_cliente_solicita=? ',[cliente.Codigo_Clientes]);
  res.render('links/list', {nSolicitudesA,nSolicitudesD,nSolicitudesP,links});
});


router.post('/Solicitudes%20Realizadas', async (req,res)=> {//aqui veo las solicitudes y proyectos
  const {ID_Usuario}=req.user;
  const nCliente=await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
  const cliente=nCliente[0]
  const nSolicitudesD = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='2' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const nSolicitudesP = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='0' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const nSolicitudesA = await pool.query("SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud='1' and ID_cliente_solicita=? ",[cliente.Codigo_Clientes]);
  const links = await pool.query('SELECT * FROM Proyectos p inner join Solicitud_Proyecto sp on p.Id_solicitud=sp.ID_Solicitud  WHERE sp.ID_cliente_solicita=? ',[cliente.Codigo_Clientes]);
  res.render('links/list', {nSolicitudesA,nSolicitudesD,nSolicitudesP,links});
});

//Aqui ingreso las habilidades del nuevo empleado
router.post('/nh', async (req,res,next)=>{//nuevamente voy a habilidades
  const lists = await pool.query('SELECT * FROM Habilidades_conocimiento');
  res.render('auth/skills',{lists});
});

router.get('/nh', async (req,res,next)=>{//nuevamente voy a habilidades
  const lists = await pool.query('SELECT * FROM Habilidades_conocimiento');
  res.render('auth/skills',{lists});
});
//-----------------------------------


router.post('/inserth', async (req,res,next)=>{ //aqui agrego las habilidades
  const {ID_Usuario}=req.user;
  const {Habilidades}=req.body;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  var seingreso = await pool.query("INSERT INTO Empleados_x_habilidades(ID_empleado,ID_habilidad) VALUES ('"+empleado.Numero_Empleado+"','"+Habilidades+"')");
  if(seingreso){ 
    req.flash("success", "Se agrego");
    res.redirect('/nh');
  }else{
    req.flash("message", "No se agrego");
    res.redirect('/nh');
  }
});


router.post('/inserte', async (req,res)=>{//extraigo los datos del formulario cliente
  const {Nombre,Direccion,Jefe,TipoEmpleado,EquipoTrabajo}=req.body;
  const{ID_Usuario}=req.user;
  const add = await pool.query("INSERT INTO Empleados (ID_Usuario,Nombre,Direccion,Numero_empleado_jefe,Tipo_empleado,ID_Equipo_Trabajo) VALUES ('"+ID_Usuario+"','"+Nombre+"','"+Direccion+"','"+Jefe+"','"+TipoEmpleado+"','"+EquipoTrabajo+"')");
  const lists = await pool.query('SELECT * FROM Habilidades_conocimiento');
  res.render('auth/skills',{lists});
});


router.get('/signin',(req,res)=>{
    res.render('auth/signin');
});


router.post('/signin', (req,res,next)=> {
    passport.authenticate('local.signin',{
        successRedirect: '/user',
        failureRedirect: '/signin',
        failureFlash:true
})(req,res,next);
});


router.post('/Brindar%20Acceso',(req,res)=>{
      res.render('links/adding');
});


//Renderizo funcionalidad
router.get('/Funcionalidades',(req,res)=>{
  res.render('links/completarf');
});


//aqui finalizo la funcionalidad
router.post('/Funcionalidades',async (req,res)=>{
  const {ID_Usuario}=req.user;
  const nEmpleado=await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0];
  const nPuesto=await pool.query('SELECT * FROM Puesto_Empleado WHERE Numero_Empleado=? ',[empleado.Numero_Empleado]);
  const puesto=nPuesto[0];                                                                                                
  if(puesto.Nombre_Puesto=="Jefe de Proyecto"){
    var completado=0;
    const nFuncionalidades = await pool.query("SELECT * FROM Funcionalidad f inner join Proyectos p on f.id_proyecto=p.ID_Proyectos  WHERE p.ID_jefe_Encargado='"+empleado.Numero_Empleado+"' AND f.Completado ='"+completado+"'");
    res.render('links/completarf',{nFuncionalidades});
  }else{
    res.render('links/completarf');
  }
});

router.get('/Funcionalidades',async (req,res)=>{
  const {ID_Usuario}=req.user;
  const nEmpleado=await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0];
  const nPuesto=await pool.query('SELECT * FROM Puesto_Empleado WHERE Numero_Empleado=? ',[empleado.Numero_Empleado]);
  const puesto=nPuesto[0];                                                                                                
  if(puesto.Nombre_Puesto=="Jefe de Proyecto"){
    var completado=0;
    const nFuncionalidades = await pool.query("SELECT * FROM Funcionalidad f inner join Proyectos p on f.id_proyecto=p.ID_Proyectos  WHERE p.ID_jefe_Encargado='"+empleado.Numero_Empleado+"' AND f.Completado ='"+completado+"'");
    res.render('links/completarf',{nFuncionalidades});
  }else{
    res.render('links/completarf');
  }
});
//--------------------------------


router.post('/Ver%20Usuarios',(req,res)=>{
     res.render('Ver-Usuarios');
});

router.post('/Agregar%20Funcionalidad',async (req,res)=>{
  const {ID_Usuario}=req.user;
  const nCliente=await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
  const cliente=nCliente[0]
  console.log(cliente.Codigo_Clientes);
  const nProyectos = await pool.query('SELECT * FROM Proyectos p inner join Solicitud_Proyecto sp on p.Id_solicitud=sp.ID_Solicitud  WHERE sp.ID_cliente_solicita=? ',[cliente.Codigo_Clientes]);
  res.render('links/funcionalidad',{nProyectos});
});

//para redireccionamiento se utiliza get
router.get('/Agregar%20Funcionalidad',async (req,res)=>{
  const {ID_Usuario}=req.user;
  const nCliente=await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
  const cliente=nCliente[0]
  console.log(cliente.Codigo_Clientes);
  const nProyectos = await pool.query('SELECT * FROM Proyectos p inner join Solicitud_Proyecto sp on p.Id_solicitud=sp.ID_Solicitud  WHERE sp.ID_cliente_solicita=? ',[cliente.Codigo_Clientes]);
  res.render('links/funcionalidad',{nProyectos});
});


//renderizo la pagina solicitar proyecto
router.post('/Solicitar%20Proyecto',(req,res)=>{
  res.render('links/historial');
});


router.get('/Solicitar%20Proyecto',(req,res)=>{
  res.render('links/historial');
});
//--------------------------------------


//renderizo la pagina solicitar proyecto
router.post('/Empleados%20a%20Proyectos',async (req,res)=>{
  const nEmpleados=await pool.query('SELECT * FROM Empleados');
  const nProyectos=await pool.query('SELECT * FROM Proyectos');
  res.render('links/listep',{nEmpleados,nProyectos});
});


router.get('/Empleados%20a%20Proyectos',async (req,res)=>{
  const nEmpleados=await pool.query('SELECT * FROM Empleados');
  const nProyectos=await pool.query('SELECT * FROM Proyectos');
  res.render('links/listep',{nEmpleados,nProyectos});
});

//--------------------------------------


//renderizo la pagina agregar actividad
router.get('/Agregar%20Actividad',async(req,res)=>{
  const {ID_Usuario}=req.user;
  var completado=0;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  const nActividades = await pool.query("SELECT * FROM Actividades a inner join Funcionalidad f on a.ID_Funcionalidad= f.ID_Funcionalidad inner join Empleados_x_Proyecto  ep on ep.ID_Proyecto =f.id_proyecto WHERE f.Completado='"+completado+"' AND ep.NumeroEmpleado_x_Proyecto='"+empleado.Numero_Empleado+"'");
  res.render('links/detalles',{nActividades});
});


router.post('/Agregar%20Actividad',async(req,res)=>{
  const {ID_Usuario}=req.user;
  var completado=0;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  const nActividades = await pool.query("SELECT * FROM Actividades a inner join Funcionalidad f on a.ID_Funcionalidad= f.ID_Funcionalidad inner join Empleados_x_Proyecto  ep on ep.ID_Proyecto =f.id_proyecto WHERE f.Completado='"+completado+"' AND ep.NumeroEmpleado_x_Proyecto='"+empleado.Numero_Empleado+"'");
  res.render('links/detalles',{nActividades});
});
//--------------------------------------


//renderizo la pagina solicitar actividad
router.get('/Solicitar%20Actividad',async(req,res)=>{
  const nFuncionalidades = await pool.query('SELECT * FROM Funcionalidad');
  res.render('links/solicitar',{nFuncionalidades});
});


router.post('/Solicitar%20Actividad',async(req,res)=>{
  const nFuncionalidades = await pool.query('SELECT * FROM Funcionalidad');
  res.render('links/solicitar',{nFuncionalidades});
});
//--------------------------------------

//renderizo la pagina ver solicitudes
router.get('/Gestionar%20Solicitudes',async(req,res)=>{
  var solicitud=0;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud=? ',[solicitud]);
  const nSolicitudesA = await pool.query('SELECT * FROM Solicitud_Actividad WHERE Aprobado=? ',[solicitud]);
  res.render('links/adminlist',{nSolicitudes,nSolicitudesA});
});


router.post('/Gestionar%20Solicitudes',async(req,res)=>{
  var solicitud=0;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud=? ',[solicitud]);
  const nSolicitudesA = await pool.query('SELECT * FROM Solicitud_Actividad WHERE Aprobado=? ',[solicitud]);
  res.render('links/adminlist',{nSolicitudes,nSolicitudesA});
});
//--------------------------------------

//renderizo la pagina proyectose (proyectos por empleado asignado)
router.get('/Proyectos%20Asignados',async(req,res)=>{
  const{ID_Usuario}=req.user;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  const nSolicitudes = await pool.query('SELECT * FROM Proyectos p inner join Empleados_x_Proyecto ep on p.ID_Proyectos =ep.ID_Proyecto WHERE ep.NumeroEmpleado_x_Proyecto=? ',[empleado.Numero_Empleado]);
  res.render('links/proyectose',{nSolicitudes,nSolicitudesA});
});

router.post('/Proyectos%20Asignados',async(req,res)=>{
  const{ID_Usuario}=req.user;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  const nProyectosAsi = await pool.query('SELECT * FROM Proyectos p inner join Empleados_x_Proyecto ep on p.ID_Proyectos =ep.ID_Proyecto WHERE ep.NumeroEmpleado_x_Proyecto=? ',[empleado.Numero_Empleado]);
  res.render('links/proyectose',{nProyectosAsi});
});
//--------------------------------------


router.get('/Brindar%20Acceso',(req,res)=>{
  res.render('links/adding');
});


router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/');
});


router.post('/listuser', async(req,res)=> {
  const{user}=req.body;
  const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario = ?", [user]);
  if (rows.length > 0) {
    await pool.query("UPDATE Usuarios SET Privilegios = '1' WHERE ID_Usuario = '"+user+"'");
     req.flash('success','Hecho');
     res.redirect('/Brindar Acceso');
     }else {
    req.flash("message", "Usuario No Encontrado");
    res.redirect('/Brindar Acceso');
  }
});


router.post('/user', async (req,res)=>{
  const {ID_Usuario,ID_Rol,Privilegios}=req.user;
  const userlog=ID_Usuario;
  var rol;
  const nPrivilegios = await pool.query('SELECT * FROM Privilegios WHERE IDRol=? ',[ID_Rol]);
      if (ID_Rol==1) rol='Administrador';
          else if (ID_Rol==2) rol='Empleado';
          else rol='Cliente';
  if (Privilegios ==1){
      res.render('mainuser/profile',{userlog,rol,nPrivilegios});
  }else{
      res.render('mainuser/profile',{userlog,rol});
  }
});


router.get('/user', async (req,res)=>{
  const {ID_Usuario,ID_Rol,Privilegios}=req.user;//Privilegios lo extraigo de local.signin
  const userlog=ID_Usuario;
  var rol;
  const nPrivilegios = await pool.query('SELECT * FROM Privilegios WHERE IDRol=? ',[ID_Rol]);
      if (ID_Rol==1) rol='Administrador';
          else if (ID_Rol==2) rol='Empleado';
          else rol='Cliente';
  if (Privilegios ==1){
      res.render('mainuser/profile',{userlog,rol,nPrivilegios});
  }else{
      res.render('mainuser/profile',{userlog,rol});
  }
});


//Aqui envio parametros a agregar proyecto y renderizo
router.get('/Agregar%20Proyecto',async(req,res)=>{
  var puesto="Jefe de Proyecto";
  var eSolicitud=1;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud=? ',[eSolicitud]);
  const nEquipoTrabajo = await pool.query('SELECT * FROM Equipo_Trabajo');
  const nPuestoEmpleado= await pool.query('SELECT * FROM Puesto_Empleado WHERE Nombre_Puesto=? ',[puesto]);
  const puestoE=nPuestoEmpleado[0];
  const nEmpleado = await pool.query('SELECT * FROM Empleados WHERE Numero_Empleado=? ',[puestoE.Numero_Empleado]);
  res.render('links/aceptar',{nSolicitudes,nEquipoTrabajo,nEmpleado});
});


router.post('/Agregar%20Proyecto',async(req,res)=>{
  var puesto="Jefe de Proyecto";
  var eSolicitud=1;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud=? ',[eSolicitud]);
  const nEquipoTrabajo = await pool.query('SELECT * FROM Equipo_Trabajo');
  const nPuestoEmpleado= await pool.query('SELECT * FROM Puesto_Empleado WHERE Nombre_Puesto=? ',[puesto]);
  const puestoE=nPuestoEmpleado[0];
  const nEmpleado = await pool.query('SELECT * FROM Empleados WHERE Numero_Empleado=? ',[puestoE.Numero_Empleado]);
  res.render('links/aceptar',{nSolicitudes,nEquipoTrabajo,nEmpleado});
});


//Para llamar la cantidad de veces la funcion al agregar proyecto
router.get('/Agregar%20Proyecto',async(req,res)=>{
  var puesto="Jefe de Proyecto";
  var eSolicitud=1;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE Estado_Solicitud=? ',[eSolicitud]);
  const nEquipoTrabajo = await pool.query('SELECT * FROM Equipo_Trabajo');
  const nPuestoEmpleado= await pool.query('SELECT * FROM Puesto_Empleado WHERE Nombre_Puesto=? ',[puesto]);
  res.render('links/aceptar',{nSolicitudes,nEquipoTrabajo,nPuestoEmpleado});
});


//aqui agrego el proyecto
router.post('/aceptarP', async (req,res)=>{
  const {Nombre,Tecnologias,presupuesto,url_trello,url_github,ET,Etiqueta,Entrega,Inicio,Encargado,Solicitud}=req.body;
  const nSolicitudes = await pool.query('SELECT * FROM Solicitud_Proyecto WHERE ID_Solicitud=? ',[Solicitud]);
  const solicitud=nSolicitudes[0];
  var seAgrego = await pool.query("INSERT INTO Proyectos (Nombre, Conjunto_Tecnologia,Presupuesto,Esta_Asignado,Pseudo_Nombre,URL_Proy_Github,URL_Proy_Trello,ID_Etiqueta,ID_Equipo_Trabajo,ID_Jefe_Encargado,Fecha_Inicio,Fecha_Entrega,Id_solicitud) VALUES ('"+solicitud.Nombre_Proyecto+"','"+Tecnologias+"','"+presupuesto+"','1','"+Nombre+"','"+url_github+"','"+url_trello+"','"+Etiqueta+"','"+ET+"','"+Encargado+"','"+Inicio+"','"+Entrega+"','"+Solicitud+"')");
  if(seAgrego){
    req.flash('success','Se agrego el proyecto');
      res.redirect('/Agregar%20Proyecto');
  }
});


//aqui agrego la funcionalidad
router.post('/agregarF', async (req,res)=>{
  const {ID_Proy,Caracteristica,Prioridad}=req.body;
  const {ID_Usuario}=req.user;
  var completado=0;
  const nCliente =await pool.query('SELECT * FROM Clientes WHERE ID_Usuario=? ',[ID_Usuario]);
  const cliente=nCliente[0] 
  var seAgrego = await pool.query("INSERT INTO Funcionalidad (Orden_Prioridad,Caracteristica,id_proyecto,id_cliente,Completado) VALUES ('"+Prioridad+"','"+Caracteristica+"','"+ID_Proy+"','"+cliente.Codigo_Clientes+"','"+completado+"')");
  if(seAgrego){
    req.flash('success','Se agrego la funcionalidad');
      res.redirect('/Agregar%20Funcionalidad');
  }
});


//aqui agrego la actividad
router.post('/agregarA', async (req,res)=>{
  const {Actividad,Actividades,Estado,Horas}=req.body;
  const {ID_Usuario}=req.user;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  var seAgrego = await pool.query("INSERT INTO Detalle_Actividades (ID_Actividad,Actividades_Realizadas,Estado_Actividad,Tiempo_Trabajado,ID_nempleado) VALUES ('"+Actividad+"','"+Actividades+"','"+Estado+"','"+Horas+"','"+empleado.Numero_Empleado+"')");
  if(seAgrego){
    req.flash('success','Se agrego la actividad');
      res.redirect('/Agregar%20Actividad');
  }
});


//aqui agrego la solicitud de actividad
router.post('/solicitarA', async (req,res)=>{
  const {Actividad, ID_Funcionalidad}=req.body;
  var Aprobado=0;
  var date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2) + ' ' + 
  ('00' + date.getUTCHours()).slice(-2) + ':' + 
  ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
  ('00' + date.getUTCSeconds()).slice(-2);
  var seAgrego = await pool.query("INSERT INTO Solicitud_Actividad (Tipo_Actividad,ID_Funcionalidad,Fecha_Solicitud,Aprobado) VALUES ('"+Actividad+"','"+ID_Funcionalidad+"','"+date+"','"+Aprobado+"')");
  if(seAgrego){
    req.flash('success','Se envio la solicitud');
      res.redirect('/Solicitar%20Actividad');
  }
});

//aqui finalizo la funcionalidad
router.post('/finalizarf', async (req,res)=>{
  const {Funcionalidad}=req.body;
  await pool.query("UPDATE Funcionalidad SET Completado = '1' WHERE ID_Funcionalidad = '"+Funcionalidad+"'");
    req.flash('success','Hecho');
      res.redirect('/Funcionalidades');
});


//aqui agrego empleados por proyecto
router.post('/agregarep', async (req,res)=>{
  const {Empleado,Proyecto}=req.body;
  var seAgrego = await pool.query("INSERT INTO Empleados_x_Proyecto (NumeroEmpleado_x_Proyecto,ID_Proyecto) VALUES ('"+Empleado+"','"+Proyecto+"')");
  if(seAgrego){
    req.flash('success','Se agrego el empleado al proyecto');
      res.redirect('/Empleados%20a%20Proyectos');
  }
});

module.exports = router;