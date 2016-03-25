var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var routes = require('./routes');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');

var photos = require('./routes/photos');
var myphotos = require('./routes/myphotos');
var mygeomaps = require('./routes/geomaps');
var models = require('./routes/models3d');
var mymodels = require('./routes/mymodels');
var delmodel = require('./routes/delmodel');
var delphoto = require('./routes/delphoto');
var editmapobject = require('./routes/editmapobject');
var geomap = require('./routes/geomap');
var putonmap = require('./routes/putonmap');
var addgeomap = require('./routes/addgeomap');
var recaptcha = require('express-recaptcha');
 
recaptcha.init('6LcZ6RUTAAAAAE4Ty5S-mH4NvzquW9UwurfeeddP', '6LcZ6RUTAAAAAMbtUOsOS84_dyyJZ1VC2xzwfdJs');
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.set('photos', __dirname + '/public/photos');

app.get('/register', recaptcha.middleware.render,register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
var upload = multer({dest:__dirname + '/public/photos'});
var upload3d = multer({dest:__dirname + '/public/models3d'});
var uploadimg = multer({dest:__dirname + '/public/imgs'});
var uploadmap = multer({dest:__dirname + '/public/geomaps'});

app.get('/upload', photos.form);
app.post('/upload',upload.single('photo_image'),photos.submit);
app.get('/uploadmap', addgeomap.form);
app.post('/uploadmap',uploadmap.single('geomap_image'),addgeomap.submit);
app.get('/myphotos',myphotos.form);
app.get('/geomaps',mygeomaps.form);
app.get('/upload3d',models.form);
app.post('/upload3d',upload3d.single('model_file'),models.submit);
app.get('/mymodels',mymodels.form);
app.get('/delmodel/:id',delmodel.form);
app.get('/delphoto/:id',delphoto.form);
app.get('/editmapobject/:id',editmapobject.form);
app.post('/editmapobject/:id',editmapobject.submit);
app.post('/mymodels',uploadimg.single('image_file'),mymodels.submit);
app.get('/putonmap/:id',putonmap.form);
app.get('/putonmap/:idm/:id',putonmap.mapobjects);
app.get('/geomap', geomap.edit);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
