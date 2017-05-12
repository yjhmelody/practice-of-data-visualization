window.addEventListener('load', function () {
    var data_info = [
        [116.417854, 39.921988, "地址：北京市东城区王府井大街88号乐天银泰百货八层"],
        [116.406605, 39.921585, "地址：北京市东城区东华门大街"],
        [116.412222, 39.912345, "地址：北京市东城区正义路甲5号"]
    ];

    var opts = {
        width: 250,
        height: 100,
        title: '站点信息',
        enableMessage: true
    }

    // 实例化地图
    var map = new MyMap("container");
    map.init();
    map.drawMarkers(data_info, opts);

    // 实例化图表
    var chart = new MyChart("chart", chartOptions);
    chart.init();
    chart.getData();
});