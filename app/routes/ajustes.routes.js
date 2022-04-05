var express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
var app = express.Router();

/* GET home page. */
app.get('/', isAuth, function (req, res, next) {
   const usr = req.session.data;
   res.render('ajustes/main', {usr});
});

app.get('/areas', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/areas', {usr});
});
app.get('/cargos', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/cargos', { usr});
});
app.get('/jefes', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/jefes', { usr });
})
app.get('/perfiles', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/perfiles', { usr });
});
app.get('/permisos', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/permisos', { usr});
});
app.get('/roles', isAuth, (req, res, next) => {
   const usr = req.session.data;
   res.render('ajustes/roles', { usr });
});

module.exports = app;
