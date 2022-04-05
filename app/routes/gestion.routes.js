var express = require('express');
const crmModel = require('../models/realtime/crm.model')
const { isAuth } = require('../middlewares/auth.middleware');
var app = express.Router();

/* GET home page. */
app.get('/', isAuth, function (req, res, next) {
   const f = new Date();
   const m = f.getMonth() + 1 < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
   const d = f.getDate() < 10 ? '0' + f.getDate() : f.getDate();
   const fecha = f.getFullYear() + '-' + m + '-' + d;
   data = {
      empleado_id: req.user.id,
      fecha: fecha
   }
   crmModel.readByMeToDay(data).then((rst) => {
      const usr = req.session.data;
      res.render('gestion/main', { data, rst, usr });
   })
});

module.exports = app;
