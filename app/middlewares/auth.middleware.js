const routeList = require('express-list-endpoints');
const {readByCookie} = require('../models/admin/empleado.model.js');

module.exports = {
   isAuth: (req, res, next) => {

      if (req.isAuthenticated()) {
       // console.log(req.isAuthenticated());
         return next();
      }
      res.redirect('/auth/login');
   },

   isAgent: (req, res, next) => {
      if(req.user.perfil_id != 12){
         return next();
      }

      res.redirect('/gestion');
   },

   cookieUserInfo: (req, res, next) => {
      const data = {id: req.session.passport.user};
      readByCookie(data)
      .then(rst => {
         //console.log(rst);
         req.session.data = rst;
         return next();
      })
      .catch(err => {
         console.log(err);
      })   
   }

}
