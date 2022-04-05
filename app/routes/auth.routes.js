var express = require('express');
var app = express.Router();
const { isAuth } = require('../middlewares/auth.middleware');

/* GET home page. */
app.get('/', function (req, res, next) {
   res.status(200).json({ msg: 'Hola AUTH' });
});

app.get('/login', (req, res, next) => {

   res.render('auth/login', { title: 'Express' });
})

app.get('/change-password', isAuth, (req, res) => {
   res.render('auth/change-password');
})


app.get('/recovery/password', (req, res, next) => {
   res.render('auth/recovery-password', { title: 'Express' });
})


module.exports = app;