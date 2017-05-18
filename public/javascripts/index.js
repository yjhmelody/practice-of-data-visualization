window.addEventListener('load', function () {
    var map = new MyMap("container")
    map.init()
    var chart = new MyChart("chart", chartOptions)
    chart.init()
    // 加载时候获取所有点的坐标跟名称
    // url根据id返回经纬度
    firstLoad('test/data.json')
});