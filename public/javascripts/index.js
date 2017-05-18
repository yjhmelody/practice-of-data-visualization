window.addEventListener('load', function () {
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
            map.setMarkers(data, 'click', (e) => {
                $.get('test/data2.json').done((data) => {
                    chart.update(data)
                    console.log('data', data)
                })
            })
        })
});