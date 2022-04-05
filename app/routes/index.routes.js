var express = require('express');
var app = express.Router();
const { isAuth, cookieUserInfo } = require('../middlewares/auth.middleware');

/* GET home page. */
app.get('/', [isAuth, cookieUserInfo], function (req, res, next) {
   const a = new Date(req.user.create_dt);
   const b = new Date(2000, 1, 1);
   
   if (a < b) {
      res.redirect('/auth/change-password');
   } else {
      const usr = req.session.data;
      res.render('home/main', { usr });
   }
});

module.exports = app;
