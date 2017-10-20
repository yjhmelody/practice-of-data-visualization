window.addEventListener('load', function () {
    let map = new MyMap('container')
    map.init()
    let chart = new MyChart("chart", chartOptions)
    chart.init()
    // 加载时候获取所有点的坐标跟名称
    // url根据id返回经纬度
    new Promise((res, rej) => {
            // 改成url
            let url = 'test/data.json'
            $.get(url).done((data) => {
                res(data)
            })
        })
        .then((data) => {
            // 设置坐标点
            map.setMarkers(data, 'click', (e) => {
                // 给每个Marker设置相应的url
                let url = 'test/data2.json'
                $.get(url).done((data) => {
                    chart.update(data)
                })
            })
        })
})