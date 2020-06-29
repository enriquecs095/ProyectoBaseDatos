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


router.post('/inserth', async (req,res,next)=>{
  const {ID_Usuario}=req.user;
  const {Habilidades}=req.body;
  const nEmpleado =await pool.query('SELECT * FROM Empleados WHERE ID_Usuario=? ',[ID_Usuario]);
  const empleado=nEmpleado[0] 
  var seingreso = await pool.query("INSERT INTO Empleados_x_habilidades(ID_empleado,ID_habilidad) VALUES ('"+empleado.Numero_Empleado+"','"+Habilidades+"')");
  const lists = await pool.query('SELECT * FROM Habilidades_conocimiento');
  if(seingreso){ 
    req.flash("success", "Se agrego");
    res.render('auth/skills',{lists});
  }else{
    req.flash("mesage", "No se agrego");
    res.render('auth/skills',{lists});
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


router.post('/Ver%20Usuarios',(req,res)=>{
     res.render('Ver-Usuarios');
});


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
  } else {
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
          else if (ID_Rol==2) rol='Auxiliar';
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
          else if (ID_Rol==2) rol='Auxiliar';
          else rol='Cliente';
  if (Privilegios ==1){
      res.render('mainuser/profile',{userlog,rol,nPrivilegios});
  }else{
      res.render('mainuser/profile',{userlog,rol});
  }
});


module.exports = router;