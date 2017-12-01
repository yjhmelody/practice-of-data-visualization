# 功能设计概述

## 地图功能

打开网页后，先加载数据库里相应的数据，给地图上相应的点进行绘制标记点并设置显示窗口，绑定相应的点击事件：点击后向相应的url发送请求加载相应id的数据然后把数据交给图表

## 图表功能

初始化先设置样式，点击标记后的根据日期和ID获取相应数据并绘制，图表显示这段时间该站点自行车的租还量，默认是折线图。右上角的工具箱可以做其他的设置

## 路由设计

### 请求获取一个站点信息

1.  `GET` 118.89.186.225:8080/api/stationRent_Return`?`stationID=xxxx`&`startTime=yyyy-mm-dd`&`endTime=yyyy-mm-dd 
     返回是否存在该站点，存在返回1、站点ID、名字、经纬度和时间段内的租还自行车辆数(同一天则返回各个时间段的情况)，否则返回0

2.  `GET` 118.89.186.225:8080/api/stationInfo`?`stationID=xxxx 
     返回是否存在该站点，存在返回1、站点ID、名字、经纬度，否则返回0

3.  `GET` 118.89.186.225:8080/api/stationAll 
     返回全部站点ID、名字、经纬度

4.  `GET` 118.89.186.225:8080/api/stationLine`?`stationID=xxxx`&`startTime=yyyy-mm-dd`&`endTime=yyyy-mm-dd 
     返回是否存在该站点，存在返回1、站点ID、名字、经纬度、时间段内与该站点相关的所有路线和各路线上的自行车辆数，（若关联站点信息存在，返回相关信息）否则返回0

如下例子

返回某段时间某个站点的所有信息

```json
如下例子
输入 http://118.89.186.225:8080/api/stationAll
[
    {"stationID":1200,"stationName":"秋涛支路清江路口","longitude":"120.202832","latitude":"30.248621"},
    {"stationID":1201,"stationName":"近江食品市场二","longitude":"120.202691","latitude":"30.247982"},
    {"stationID":1202,"stationName":"秋涛支路","longitude":"120.201313","latitude":"30.246672"},
    {"stationID":1203,"stationName":"近江加油站","longitude":"120.200949","latitude":"30.245774"},
    {"stationID":1204,"stationName":"秋涛支路南口","longitude":"120.200407","latitude":"30.24515"},
    {"stationID":1205,"stationName":"石贯子巷","longitude":"120.175826","latitude":"30.261408"},
    {"stationID":1206,"stationName":"延安路解放路口","longitude":"120.170548","latitude":"30.253535"},
    {"stationID":1207,"stationName":"莫邪塘社区","longitude":"120.195792","latitude":"30.247404"},
    {"stationID":1228,"stationName":"钱江路南口","longitude":"120.184822","latitude":"30.223223"},
    {"stationID":1229,"stationName":"直大方伯解放路口","longitude":"120.18513","latitude":"30.256288"}
    ......
]
输入 http://118.89.186.225:8080/api/stationInfo?stationID=1210
{
    "isRight":1,
    "stationID":1210,
    "stationName":"之江路九四五号",
    "longitude":120.213257,
    "latitude":30.237366
}
输入 http://118.89.186.225:8080/api/stationRent_Return?stationID=1210&startTime=2014-03-23&endTime=2014-03-23
{
    "isRight":1,
    "stationID":1210,
    "stationName":"之江路九四五号",
    "longitude":120.213257,
    "latitude":30.237366,
    "rental":
    [
        {"rentalnum":1,"time":6},
        {"rentalnum":1,"time":7},
        {"rentalnum":2,"time":8},
        {"rentalnum":4,"time":9},
        {"rentalnum":1,"time":10},
        {"rentalnum":4,"time":11},
        {"rentalnum":1,"time":12},
        {"rentalnum":2,"time":14},
        {"rentalnum":1,"time":15},
        {"rentalnum":1,"time":16},
        {"rentalnum":2,"time":18},
        {"rentalnum":1,"time":19},
        {"rentalnum":1,"time":20}
     ],
     "return":
     [
         {"returnnum":1,"time":7},
         {"returnnum":1,"time":8},
         {"returnnum":4,"time":9},
         {"returnnum":1,"time":10},
         {"returnnum":1,"time":12},
         {"returnnum":2,"time":13},
         {"returnnum":2,"time":14},
         {"returnnum":4,"time":15},
         {"returnnum":4,"time":16},
         {"returnnum":3,"time":19},
         {"returnnum":1,"time":20}
    ]
}

输入 http://118.89.186.225:8080/api/stationRent_Return?stationID=121011&startTime=2014-03-23&endTime=2014-03-23
{
   "isRight":0
}

输入 http://118.89.186.225:8080/api/stationLine?stationID=1210&startTime=2014-03-23&endTime=2014-03-23
{
    "isRight":1,
    "stationID":1210,
    "stationName":"之江路九四五号",
    "longitude":120.213257,
    "latitude":30.237366,
    "line":
    [
        {"leaseStation":1210,"returnStation":1076,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1080,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1095,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1126,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1187,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1210,"bikeNum":3,"stationName":"之江路九四五号","longitude":120.21326,"latitude":30.237366},{"leaseStation":1210,"returnStation":1289,"bikeNum":1,"stationName":"之江路清江路口","longitude":120.215126,"latitude":30.238888},{"leaseStation":1210,"returnStation":1319,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1322,"bikeNum":2},
        {"leaseStation":1210,"returnStation":1367,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1397,"bikeNum":1},
        {"leaseStation":1210,"returnStation":1430,"bikeNum":3},
        {"leaseStation":1210,"returnStation":1432,"bikeNum":1},
        {"leaseStation":1210,"returnStation":3202,"bikeNum":1},
        {"leaseStation":1210,"returnStation":3219,"bikeNum":1},
        {"leaseStation":1210,"returnStation":6010,"bikeNum":1},
        {"leaseStation":1210,"returnStation":8008,"bikeNum":1},
        {"leaseStation":1042,"returnStation":1210,"bikeNum":1},
        {"leaseStation":1208,"returnStation":1210,"bikeNum":2,"stationName":"之江路望江东路口","longitude":120.20458,"latitude":30.230438},{"leaseStation":1210,"returnStation":1210,"bikeNum":3,"stationName":"之江路九四五号","longitude":120.21326,"latitude":30.237366},{"leaseStation":1213,"returnStation":1210,"bikeNum":1,"stationName":"清江路三四六号","longitude":120.21187,"latitude":30.2414},{"leaseStation":1274,"returnStation":1210,"bikeNum":1,"stationName":"衢江路口","longitude":120.21165,"latitude":30.236462},{"leaseStation":1288,"returnStation":1210,"bikeNum":1,"stationName":"之江路九六一号","longitude":120.213715,"latitude":30.237772},{"leaseStation":1289,"returnStation":1210,"bikeNum":1,"stationName":"之江路清江路口","longitude":120.215126,"latitude":30.238888},{"leaseStation":1308,"returnStation":1210,"bikeNum":1},
        {"leaseStation":1319,"returnStation":1210,"bikeNum":1},
        {"leaseStation":1351,"returnStation":1210,"bikeNum":3},
        {"leaseStation":1354,"returnStation":1210,"bikeNum":2},
        {"leaseStation":1428,"returnStation":1210,"bikeNum":1},
        {"leaseStation":1430,"returnStation":1210,"bikeNum":4},
        {"leaseStation":1432,"returnStation":1210,"bikeNum":1},
        {"leaseStation":3253,"returnStation":1210,"bikeNum":1}
    ]
}
```
