const config = {
    port: 'http://118.89.186.225:8080'
}

let map = new MyMap('container')
let chart = new MyChart("chart", chartOptions)

window.addEventListener('load', function () {
    map.init()
    chart.init()
    // 加载时候获取所有点的坐标跟名称
    // url根据id返回经纬度
    new Promise((res, rej) => {
            // 改成url
            let url = config.port + '/api/stationAll'
            $.get(url).done((data) => {
                res(data)
            })
        })
        .then((data) => {
            // 设置坐标点
            markers = map.setMarkers(JSON.parse(data))
            // markers.forEach(function (elem, i) {
            //     let url = config.port + '/api/stationRent_Return'
            //     elem.addEventListener('click', function (e) {
            //         $.get()
            //     })
            // })
        })
})