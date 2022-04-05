var express = require('express');
const { isAuth, isAgent } = require('../middlewares/auth.middleware');
var app = express.Router();

/* GET home page. */
app.get('/', [isAuth, isAgent], function (req, res, next) {
   const usr = req.session.data;
   res.render('monitoreo/main', { usr });
});

module.exports = app;
