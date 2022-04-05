var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Other imports from
require('dotenv').config();
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
// mysql connect params
const { database } = require('./settings/app.settings');

var apiRouter = require('./app/routes/api.routes');
var ajustesRouter = require('./app/routes/ajustes.routes');
var authRouter = require('./app/routes/auth.routes');
var gestionRouter = require('./app/routes/gestion.routes');
var horariosRouter = require('./app/routes/horarios.routes')
var indexRouter = require('./app/routes/index.routes');
var monitoreoRouter = require('./app/routes/monitoreo.routes');
var reportesRouter = require('./app/routes/reportes.routes');
var usuariosRouter = require('./app/routes/usuarios.routes')

// require('./app/libs/passport.auth');
var app = express();
require('./app/libs/passport.auth');
// view engine setup
app.set('views', path.join(__dirname, 'app/views/'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// systems middleware
app.use(cors());
app.use(session({
  secret: '9OrBpBjM0JfLjY1iE7kd',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// define locals vars

app.use((req, res, next) => {
  app.locals.appname = 'DNASA APP';
  app.locals.subtitle = 'Sistema de Registros y Adherencia';
  app.locals.success = req.flash('success');
  app.locals.danger = req.flash('danger');
  app.locals.warning = req.flash('warning');
  app.locals.info = req.flash('info');
  app.locals.user = req.user;
  // app.locals.menu = menu;

  next();
});

// define api headers

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin'
  );
  res.header('Access-Control-Expose-Headers', 'Content-Length,Content-Range');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE'
  );
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// define base path routes
app.use('/api', apiRouter); // define todas las funciones de backend dentro de la aplicacion
app.use('/ajustes', ajustesRouter);
app.use('/auth', authRouter);
app.use('/gestion', gestionRouter);
app.use('/horarios', horariosRouter);
app.use('/', indexRouter);
app.use('/monitoreo', monitoreoRouter);
app.use('/reportes', reportesRouter);
app.use('/usuarios', usuariosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors/error');

});

module.exports = app;
