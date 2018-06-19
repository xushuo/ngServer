var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ws = require('ws');
var fs = require('fs');

var index = require('./routes/index');

var app = express();

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var stocks = [{
    "id" : 1,
    "name" : "股票1",
    "price" : 1.99,
    "rating" : 3.5,
    "desc" : "不错的股票1",
    "categories" : ["IT", "教育"]
}, {
    "id" : 2,
    "name" : "股票2",
    "price" : 2.99,
    "rating" : 1.5,
    "desc" : "不错的股票2",
    "categories" : ["IT", "教育", "金融"]
}, {
    "id" : 3,
    "name" : "股票3",
    "price" : 3.99,
    "rating" : 4.5,
    "desc" : "不错的股票3",
    "categories" : ["金融", "教育"]
}, {"id" : 4, "name" : "股票4", "price" : 4.99, "rating" : 5, "desc" : "不错的股票4", "categories" : ["金融", "IT"]}, {
    "id" : 5,
    "name" : "股票5",
    "price" : 5.99,
    "rating" : 2.5,
    "desc" : "不错的股票5",
    "categories" : ["教育"]
}, {"id" : 6, "name" : "股票6", "price" : 6.99, "rating" : 3, "desc" : "不错的股票6", "categories" : ["教育", "金融"]}, {
    "id" : 7,
    "name" : "股票7",
    "price" : 7.99,
    "rating" : 0,
    "desc" : "不错的股票7?",
    "categories" : ["IT", "教育"]
}];

app.use('/api/products/:id', function(req, res){
    console.log(req.params.id);
    res.send(stocks.find((e)=>e.id==req.params.id));
});
app.use('/api/products', function(req, res){
    console.log(req.params.id);
    res.send(stocks);
});
app.use('/static/mock/:name', function(req, res){
    console.log(req.params.name)
    res.send(JSON.parse(fs.readFileSync('./mock/'+req.params.name)));
});

/*
var wsServer = new Server({
    port:8085
});
wsServer.on("connection",websocket =>{
    websocket.send('这个是服务器主动推送的')
})
*/


app.use('/webapp/*', function(req, res){
    res.render('index');
});

app.use('/', index);
// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
