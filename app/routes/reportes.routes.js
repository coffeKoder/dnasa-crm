var express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
var app = express.Router();

/* GET home page. */
app.get('/', isAuth, function (req, res, next) {
   const usr = req.session.data;
   res.render('reportes/main', { usr });
});

module.exports = app;
