let map = new MyMap('container')
let chart = new MyChart("chart", chartOptions)
let globalPoints = []
let relationPoints = []

window.addEventListener('load', function () {
    map.init()
    chart.init()
    // 加载时候获取所有点的坐标跟名称
    // url根据id返回经纬度
    new Promise((res, rej) => {
            // 改成url
            let url = config.port + '/api/stationAll'
            $.get(url).done((data) => {
                globalPoints = data
                res(data)
            })
        })
        .then((data) => {
            // 设置坐标点
            let markers = addMarkers(data)
            console.log(markers)
            // 绘制海量点
            // map.map.addOverlay(markers)
            // markers.addEventListener('click', formSearch);
            markers = map.setMarkers(data)
        })
        .then(null, function(err){
            if(err){
                console.log(err)
            }
        })
})