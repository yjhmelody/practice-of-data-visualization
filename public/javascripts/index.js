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
    var coords = [];
    $.get('test/data.json').done(function (data) {
        coords = data;
        console.log(data);
        //拿到坐标数据后设置Markers
        map.setMarkers(coords, 'click', function (e) {
            //加载相应的租还量数据url
            // 准备Promise化
            $.get('test/data2.json').done(function(data){
                chart.update(data);
                console.log(data);
            })
            // test
            console.log('回调测试')
        });
    })
});