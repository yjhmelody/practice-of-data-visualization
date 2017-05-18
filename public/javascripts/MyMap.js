var infoWindowOptions = {
    width: 250, // 信息窗口宽度
    height: 80, // 信息窗口高度
    title: "站点信息", // 信息窗口标题
    enableMessage: true //设置允许信息窗发送短息
};

/**
 * 
 * @class MyMap
 * @param {string} id 
 */

function MyMap(id) {
    if (typeof id === 'string') {
        this.id = id
    } else {
        throw TypeError("id类型错误")
    }
}
/**
 *  init the map
 */
MyMap.prototype.init = function init() {
    var map = new BMap.Map(this.id); // 创建地图实例  
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

    this.map = map;
}

/**
 * 
 * 
 * @param {any} data 坐标相关数据
 * @param {string} event 事件名称
 * @param {function} callback 事件回调
 */

MyMap.prototype.setMarkers = function (data, event, callback) {
    if (typeof data != 'object') {
        throw TypeError("类型错误")
    }
    // 设置Markers同时把视图移动到第一个Marker
    var center = new BMap.Point(data[0].longiTude, data[0].latiTude)
    this.map.centerAndZoom(center, 14)
    for (var i = 0; i < data.length; i++) {
        // 根据data创建相应的标注
        var marker = new BMap.Marker(new BMap.Point(data[i].longiTude, data[i].latiTude))
        // 块级作用域
        let content = '站点名：' + data[i].stationName
        // console.log(content)
        this.map.addOverlay(marker)
        //绑定当前作用域
        var that = this
        marker.addEventListener('click', function (e) {
            that.openInfo(content, e)
        })
        // 给Marker添加回调
        if (arguments.length === 3) {
            if (typeof event === 'string' && typeof callback === 'function') {
                marker.addEventListener(event, callback)
            } else {
                throw new TypeError("类型错误")
            }
        }
    }
}

/**
 * 
 * @param {any} content 信息窗口内容 
 * @param {any} e 事件
 */
MyMap.prototype.openInfo = function (content, e) {

    var p = e.target
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
    var infoWindow = new BMap.InfoWindow(content, infoWindowOptions)
    // 根据Point和InfoWindow开启
    this.map.openInfoWindow(infoWindow, point)
}