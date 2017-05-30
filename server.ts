/**
 * Created by Administrator on 2017/5/30.
 */
import * as express from "express";
import {Server} from "ws";
const app = express();
export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>){

    };
}
const stocks:Stock[]=[
    new Stock(1, "股票1", 1.99, 3.5, "不错的股票1", ["IT", "教育"]),
    new Stock(2, "股票2", 2.99, 1.5, "不错的股票2", ["IT", "教育","金融"]),
    new Stock(3, "股票3", 3.99, 4.5, "不错的股票3", ["金融", "教育"]),
    new Stock(4, "股票4", 4.99, 5, "不错的股票4", ["金融", "IT"]),
    new Stock(5, "股票5", 5.99, 2.5, "不错的股票5", ["教育"]),
    new Stock(6, "股票6", 6.99, 3.0, "不错的股票6", ["教育", "金融"]),
    new Stock(7, "股票7", 7.99, 0, "不错的股票7?", ["IT", "教育"])
];

app.get('/api/products/:id', function(req, res){
    res.json(stocks.find((e)=>e.id==req.params.id));
});
app.get('/api/products', function(req, res){
    res.json(stocks);
});

const subscriptions = new Set<any>();
const wsServer = new Server({port:8085});
wsServer.on("connection",websocket =>{
    subscriptions.add(websocket);
})
var count=1;
setInterval(() => {
    subscriptions.forEach(ws => {
        if(ws.readyState ===1 ){
            //如果连接正常
            ws.send(JSON.stringify({msgCount: count++ }));
        }else {
            subscriptions.delete(ws);
        }
    })
},3000)

const server = app.listen(3000,'localhost',()=>{
    console.log('服务已启动 localhost：3000')
})
