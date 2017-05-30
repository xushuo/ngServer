"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Administrator on 2017/5/30.
 */
var express = require("express");
var ws_1 = require("ws");
var app = express();
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
app.get('/api/products/:id', function (req, res) {
    res.json(stocks.find(function (e) { return e.id == req.params.id; }));
});
app.get('/api/products', function (req, res) {
    res.json(stocks);
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
var server = app.listen(3000, 'localhost', function () {
    console.log('服务已启动 localhost：3000');
});
