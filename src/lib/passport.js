const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "pwd",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario = ?", [username]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password,user.Contrasena);
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.ID_Usuario));
        } else {
          done(null, false, req.flash("message", "Contrasena Incorrecta"));
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
      usernameField: "Username",
      passwordField: "pwd",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { Rol } = req.body;
      const newUser = {
        username,
        password,
        Rol,
      };
      console.log(newUser);
      newUser.password = await helpers.encryptPassword("pwd");
      console.log(newUser);
      const result = await pool.query("INSERT INTO Usuarios(ID_Usuario,Contrasena,ID_Rol) VALUES ('" +newUser.username +"','" +newUser.password +"','" +newUser.Rol +"')");
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const rows = await pool.query("SELECT * FROM Usuarios WHERE ID_Usuario=? ", [
    username,
  ]);
  done(null, rows[0]);
});
