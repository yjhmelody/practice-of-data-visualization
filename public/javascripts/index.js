window.addEventListener('load', function () {
    var data_info = [
        [116.417854, 39.921988, "地址：北京市东城区王府井大街88号乐天银泰百货八层"],
        [116.406605, 39.921585, "地址：北京市东城区东华门大街"],
        [116.412222, 39.912345, "地址：北京市东城区正义路甲5号"]
    ];

    var map = new MyMap("container");
    map.init();
    var chart = new MyChart("chart", chartOptions);
    chart.init();
    // chart.getData("test/data2.json");
    // 加载时候获取所有点的坐标跟名称
    // url根据id返回经纬度
    new Promise((res, rej) => {
            $.get('test/data.json').done((data) => {
                res(data)
            })
        })
        .then((data) => {
            console.log('promise', data)
            // 缓存数据
            (function () {
                var cache
                map.setMarkers(data, 'click', (e) => {
                    if (cache != null) {
                        chart.update(cache)
                        // console.log('cache', cache)
                        return
                    }

                    $.get('test/data2.json').done((data) => {
                        chart.update(data)
                        cache = data
                        // console.log('data', data)
                    })
                })
            })()
        })
});