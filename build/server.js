"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/5/30.
 */
var express = require("express");
var ws_1 = require("ws");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var formidable = require("formidable");
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    ;
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "股票1", 1.99, 3.5, "不错的股票1", ["IT", "教育"]),
    new Stock(2, "股票2", 2.99, 1.5, "不错的股票2", ["IT", "教育", "金融"]),
    new Stock(3, "股票3", 3.99, 4.5, "不错的股票3", ["金融", "教育"]),
    new Stock(4, "股票4", 4.99, 5, "不错的股票4", ["金融", "IT"]),
    new Stock(5, "股票5", 5.99, 2.5, "不错的股票5", ["教育"]),
    new Stock(6, "股票6", 6.99, 3.0, "不错的股票6", ["教育", "金融"]),
    new Stock(7, "股票7", 7.99, 0, "不错的股票7?", ["IT", "教育"])
];
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Report = (function () {
    function Report(id, name, create, gradeName, className, type, subject) {
        this.id = id;
        this.name = name;
        this.create = create;
        this.gradeName = gradeName;
        this.className = className;
        this.type = type;
        this.subject = subject;
    }
    return Report;
}());
exports.Report = Report;
var TableList = (function () {
    function TableList(id, name, belongSys, version, updateTime, creatTime, updateNote) {
        this.id = id;
        this.name = name;
        this.belongSys = belongSys;
        this.version = version;
        this.updateTime = updateTime;
        this.creatTime = creatTime;
        this.updateNote = updateNote;
    }
    return TableList;
}());
exports.TableList = TableList;
var reports = [
    new Report(1, '江苏省宝应中学高三双周测试2', new Date(1496906833297), '高一', '2班', '月考', '语文，数学，外语，物理，政治，地理，历史，生物'),
    new Report(2, '江苏省宝应中学高三双周测试3', new Date(1496800116618), '高一', '8班', '月考', '语文，数学，外语，物理，政治，地理，历史，生物'),
    new Report(3, '江苏省宝应中学高三双周测试4', new Date(1496800116618), '高一', '2班', '月考', '数学，外语，物理，政治，地理，历史，生物'),
    new Report(4, '江苏省宝应中学高三双周测试5', new Date(1496800116618), '高二', '2班', '月考', '语文，数学，外语，物理，政治，地理，历史，生物'),
    new Report(5, '江苏省宝应中学高三双周测试6', new Date(1496800116618), '高一', '8班', '月考', '外语，物理，政治，地理，历史，生物'),
    new Report(6, '江苏省宝应中学高三双周测试7', new Date(1496800116618), '高二', '2班', '月考', '语文，数学，外语，物理，政治，地理，历史，生物'),
    new Report(7, '江苏省宝应中学高三双周测试8', new Date(1496800116618), '高一', '2班', '月考', '语文，数学，物理，政治，地理，历史，生物'),
    new Report(8, '江苏省宝应中学高三双周测试9', new Date(1496800116618), '高二', '2班', '月考', '语文，数学，物理，政治，地理，历史，生物'),
    new Report(9, '江苏省宝应中学高三双周测试9', new Date(1496880116618), '高二', '8班', '月考', '语文，数学，物理，政治，地理，历史，生物'),
    new Report(10, '江苏省宝应中学高三双周测试10', new Date(1496800116618), '高一', '2班', '月考', '语文，外语，物理，政治，地理，历史，生物'),
    new Report(11, '江苏省宝应中学高三双周测试11', new Date(1296800116618), '高一', '8班', '月考', '外语，物理，政治，地理，历史，生物'),
    new Report(12, '江苏省宝应中学高三双周测试12', new Date(1196800116618), '高二', '2班', '月考', '外语，物理，政治，地理，历史，生物')
];
var tableList = [
    new TableList(0, '分析报告', '', '1.2', new Date(1196800116618), '', ''),
    new TableList(1, 'CRM', '', '1.6', new Date(1196802316618), '', ''),
    new TableList(2, 'BI系统', '', '1.4', new Date(1196400116618), '', '')
];
var series1 = [
    {
        name: '满分',
        type: 'bar',
        data: [120, 100, 100, 110, 100, 110, 100, 100, 100, 100]
    },
    {
        name: '最高分',
        type: 'bar',
        data: [110, 100, 99, 98, 90, 100, 90, 95, 96, 100]
    },
    {
        name: '均分',
        type: 'bar',
        data: [77.5, 80.2, 75.3, 69.8, 72.3, 77, 78.6, 71.3, 70.9, 69.8]
    },
    {
        name: '最低分',
        type: 'bar',
        data: [32, 44.5, 34, 54.5, 21.5, 33, 40, 9, 11, 19]
    },
    {
        name: '标准差',
        type: 'line',
        data: [2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
    }
];
var series2 = [{
        name: '难度',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: (function () {
                    var temp = [];
                    for (var i = 0; i < 10; i++) {
                        temp.push(Math.random().toFixed(2));
                    }
                    return temp;
                })(),
                name: '数据1'
            },
            {
                value: (function () {
                    var temp = [];
                    for (var i = 0; i < 10; i++) {
                        temp.push(Math.random().toFixed(2));
                    }
                    return temp;
                })(),
                name: '数据2'
            }
        ]
    }];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/api/user/login', function (req, res) {
    var user = req.body.user;
    console.log({ user1: user });
    var temp = JSON.parse(user);
    console.log({ user1: temp });
    console.log({ user1: temp.userName });
    if (temp.userName == '123') {
        // res.send({data: user });
        res.send({ data: { status: 1, msg: 'success' } });
    }
    else {
        res.send({ data: { status: 0, msg: 'failed' } });
    }
});
app.use('/api/exam/list', function (req, res) {
    console.log({ page: req.query.page });
    if (req.query.page == 1) {
        res.json({
            currentPage: 1,
            maxPage: 11,
            data: [reports[0], reports[1], reports[2], reports[3], reports[4]]
        });
    }
    else if (req.query.page == 2) {
        res.json({
            currentPage: 2,
            maxPage: 11,
            data: [reports[5], reports[6], reports[7], reports[8], reports[9]]
        });
    }
    else {
        res.json({
            currentPage: 3,
            maxPage: 11,
            data: [reports[10], reports[11]]
        });
    }
});
app.use('/api/report/baseData', function (req, res) {
    console.log({ id: req.query.id });
    //res.json(series.find((e) => e.id == req.query.id));
    if (req.query.type == 1) {
        res.json({
            id: 1,
            data: series1
        });
    }
    if (req.query.type == 2) {
        res.json({
            id: 2,
            data: series2
        });
    }
});
app.use('/api/products/:id', function (req, res) {
    res.json(stocks.find(function (e) { return e.id == req.params.id; }));
});
app.use('/api/products', function (req, res) {
    console.log({ body: req });
    res.json(stocks);
});
app.use('/api/func/list', function (req, res) {
    console.log({ page: req.query.page, msg: "func" });
    if (req.query.page == 1) {
        res.json({
            currentPage: 1,
            maxPage: 11,
            data: [tableList[0], tableList[1]]
        });
    }
    else if (req.query.page == 2) {
        res.json({
            currentPage: 2,
            maxPage: 11,
            data: [tableList[0], tableList[1], tableList[2]]
        });
    }
    else {
        res.json({
            currentPage: 3,
            maxPage: 11,
            data: [tableList[1], tableList[2]]
        });
    }
});
app.use('/local/formTest', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log('fields', fields); //表单传递的input数据
        console.log('files', files); //上传文件数据
        //do somthing......
        res.send({ data: 'success' });
    });
});
var subscriptions = new Set();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    subscriptions.add(websocket);
});
var count = 1;
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            //如果连接正常
            ws.send(JSON.stringify({ msgCount: count++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 3000);
var server = app.listen(3000, '192.168.31.63', function () {
    console.log('服务已启动 192.168.31.63：3000');
});
