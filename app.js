var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var doctorRouter = require('./routes/doctor');
var patientRouter = require('./routes/patient');
var sellerRouter = require('./routes/sellerMedicine');
var systemRouter = require('./routes/system');
var bodyParser = require('body-parser');
var passport = require('passport');


var path = require('path');


var mongoose = require('mongoose');

var app = express();
// mongodb connection
const connection = mongoose.connect('mongodb://localhost:27017/Befit', { useNewUrlParser: true, useUnifiedTopology: true });
connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve html files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html',require('ejs').renderFile);
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// we change this

// app.use("/mypeer",peerServer)
// const server=http.createServer(app)

// const socketio=require('socket.io');
// const io= socketio(server).sockets
// const http=require('http');
// const {ExpressPeerServer}=require('peer'); // it  generate random id for each  peerjs  connector from client

// const customGenerationFunction = () =>
//   (Math.random().toString(36) + "0000000000000000000").substr(2, 16)

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/",
//   generateClientId: customGenerationFunction,
// });

module.exports = app;
