/**
 * Created by Administrator on 2017/5/30.
 */
import * as express from "express";
import {Server} from "ws";
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();
export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    };
}
const stocks: Stock[] = [
    new Stock(1, "股票1", 1.99, 3.5, "不错的股票1", ["IT", "教育"]),
    new Stock(2, "股票2", 2.99, 1.5, "不错的股票2", ["IT", "教育", "金融"]),
    new Stock(3, "股票3", 3.99, 4.5, "不错的股票3", ["金融", "教育"]),
    new Stock(4, "股票4", 4.99, 5, "不错的股票4", ["金融", "IT"]),
    new Stock(5, "股票5", 5.99, 2.5, "不错的股票5", ["教育"]),
    new Stock(6, "股票6", 6.99, 3.0, "不错的股票6", ["教育", "金融"]),
    new Stock(7, "股票7", 7.99, 0, "不错的股票7?", ["IT", "教育"])
];
export class User {
    id: number;
    userName: string;
    nickName: string;
    password: string;
    email: string;
    confirmPassword: string;
    vcode: string;
}
export class Report {
    constructor(public id: number,
                public name: string,
                public create: Date,
                public gradeName: string,
                public className: string,
                public type: string,
                public subject: string) {
    }
}
const reports: Report[] = [
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
const series1 = [
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
const series2 = [{
    name: '难度',
    type: 'radar',
    // areaStyle: {normal: {}},
    data: [
        {
            value: (function () {
                var temp = [];
                for (var i = 0; i < 10; i++) {
                    temp.push(Math.random().toFixed(2))
                }
                return temp
            })(),
            name: '数据1'
        },
        {
            value: (function () {
                var temp = [];
                for (var i = 0; i < 10; i++) {
                    temp.push(Math.random().toFixed(2))
                }
                return temp
            })(),
            name: '数据2'
        }
    ]
}];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api/user/login', function (req, res) {
    var user: User = req.body.user;
    console.log({user1: user});
    var temp = JSON.parse(user);
    console.log({user1: temp);
    console.log({user1: temp.userName);
    if (temp.userName == '123') {
        // res.send({data: user });
        res.send({data: {status: 1, msg: 'success'}});
    } else {
        res.send({data: {status: 0, msg: 'failed'}});
    }
    );
app.use('/api/exam/list', function (req, res) {
    console.log({page: req.query.page});
    if (req.query.page == 1) {
        res.json({
            currentPage: 1,
            maxPage: 11,
            data: [reports[0], reports[1], reports[2], reports[3], reports[4]]
        });
    } else if (req.query.page == 2) {
        res.json({
            currentPage: 2,
            maxPage: 11,
            data: [reports[5], reports[6], reports[7], reports[8], reports[9]]
        });
    } else {
        res.json({
            currentPage: 3,
            maxPage: 11,
            data: [reports[10], reports[11]]
        });
    }
});
app.use('/api/report/baseData', function (req, res) {
    console.log({id: req.query.id});
    //res.json(series.find((e) => e.id == req.query.id));
    if (req.query.type == 1) {
        res.json({
            id: 1,
            data: series1
        })
    }
    if (req.query.type == 2) {
        res.json({
            id: 2,
            data: series2
        })
    }

});


app.use('/api/products/:id', function (req, res) {
    res.json(stocks.find((e) => e.id == req.params.id));
});
app.use('/api/products', function (req, res) {
    console.log({body:req});
    res.json(stocks);
});

const subscriptions = new Set<any>();
const wsServer = new Server({port: 8085});
wsServer.on("connection", websocket => {
    subscriptions.add(websocket);
})
var count = 1;
setInterval(() => {
    subscriptions.forEach(ws => {
        if (ws.readyState === 1) {
            //如果连接正常
            ws.send(JSON.stringify({msgCount: count++}));
        } else {
            subscriptions.delete(ws);
        }
    })
}, 3000)

const server = app.listen(3001, 'localhost', () => {
    console.log('服务已启动 localhost：3000')
})
