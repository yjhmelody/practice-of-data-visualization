window.addEventListener('load', initMap);

function initMap(e) {
    var map = new BMap.Map("container"); // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915); // 创建点坐标  
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别 
    //初始化控件
    var geolocationControl = new BMap.GeolocationControl();
    var navigationControl = new BMap.NavigationControl();
    var overviewControl = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(0, 40),
        isOpen: true
    });
    var scaleControl = new BMap.ScaleControl();
    var copyrightControl = new BMap.CopyrightControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    });
    
    // 返回地图可视化区域
    var bs = map.getBounds();
    // 设置copyright
    copyrightControl.addCopyright({
        id: 123456789,
        content: '<h2>just for fun!</h2>',
        bounds: bs
    });
    var mapTypeControl = new BMap.MapTypeControl();

    //绑定控件
    map.addControl(geolocationControl);
    map.addControl(navigationControl);
    map.addControl(overviewControl);
    map.addControl(scaleControl);
    map.addControl(copyrightControl);
    map.addControl(mapTypeControl);

    //map绑定事件
}
