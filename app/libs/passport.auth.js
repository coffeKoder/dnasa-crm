const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const criptex = require('./password.hash');
const authModel = require('../models/auth/auth.model');
const empleadoModel = require('../models/admin/empleado.model');

// valida usuario y contraseña
passport.use('local.signin', new LocalStrategy({
   usernameField: 'usuario',
   passwordField: 'clave',
   passReqToCallback: true,
}, async (req, username, password, done) => {
   const result = await authModel.auth({ usuario: username });
   if (result.length > 0) {
      const user = result[0];
      await criptex.decrypt(password, user.clave).then((validPassword) => {
         if (validPassword) {
            done(null, user, req.flash('success', "Autenticacion correcta"));
         } else {
            done(null, false, req.flash('warning', "Autenticacion fallida, usuario o contraseña incorrecta"))
         }
      });
   } else {
      done(null, false, req.flash('Danger', "Usuario no existe"))
   }
}))

//  recupera el id del usuario
passport.serializeUser((user, done) => {
   //console.log(user);
   done(null, user.id);
})

// devuelve los datos del usuario
passport.deserializeUser(async (id, done) => {
   const data = { acceso_id: id };
   try {
      await empleadoModel.readByAccesoId(data).then((user) => {
         if (user) {
            done(null, user[0]);
         } else {
            console.log(user);
         }
      })
   } catch (err) {
      console.log(err);
   }
})
