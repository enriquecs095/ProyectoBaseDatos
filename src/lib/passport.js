const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("../lib/helpers");


passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario = ?", [username]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password,user.Contrasena);
        if (validPassword) {
         done(null, user); //, req.flash("success", "Bienvenido " + user.ID_Usuario)
        } else {
        return done(null, false, req.flash("message", "Contrasena Incorrecta"));
        }
      } else {
        return done(null,false,req.flash("message", "Usuario No Encontrado"));
      }
    }
  )
);



passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: 'ID_Usuario',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, ID_Usuario, password, done) => {
      const { Rol, Cpassword } = req.body;
      const newUser = {
        ID_Usuario,
        password,
        Rol,
      };
      var Privilegios=0;
      const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario = ?", [ID_Usuario]);
      if(rows.length>0){
          return done(null,false,req.flash("message", "Usuario ya existe"));
        }else{ 
          if(password==Cpassword){
              newUser.password = await helpers.encryptPassword(password);
              const result = await pool.query("INSERT INTO Usuarios(ID_Usuario,Contrasena,ID_Rol,Privilegios) VALUES ('" +newUser.ID_Usuario +"','" +newUser.password +"','" +newUser.Rol + "','" +Privilegios+ "')");
              done(null, newUser);
          }else{
              return done(null,false,req.flash("message", "Constraseñas no coinciden"));
      }
    }
  }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.ID_Usuario);
});


passport.deserializeUser(async (username, done) => {
  const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario=? ", [
    username,
  ]);
  done(null, rows[0]);
});
