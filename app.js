var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter= require("./routes/products")
const categoriesRouter=require("./routes/categories")
const jwt=require("jsonwebtoken");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const verifyToken=(req,res,next)=>{
  jwt.verify(req.headers["x-access-token"],"claveok2020",function(err,decoded){//sino, si pongo arriba app.set("key","clave"),a ca pondria en vez e "claveok2020"---req.app.get("key")y llama a lo q defini arriba
      if(err){
          res.json(err.message)
          
      }else{
          console.log(decoded, "ok token")
          next()
      }
  })
}

app.verifyToken=verifyToken
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  res.json({message:err?.message})
});

module.exports = app;
