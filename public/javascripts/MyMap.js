let infoWindowOptions = {
    width: 250, // 信息窗口宽度
    height: 80, // 信息窗口高度
    title: "站点信息", // 信息窗口标题
    enableMessage: true //设置允许信息窗发送短息
};

/**
 * 封装BMap类
 * @class MyMap
 * @param {string} id 
 */

function MyMap(id) {
    if (typeof id === 'string') {
        this.id = id
        this.map = null
    } else {
        throw TypeError('id类型错误')
    }
}
/**
 *  init the map
 */
MyMap.prototype.init = function init() {
    let map = new BMap.Map(this.id); // 创建地图实例  
    let point = new BMap.Point(116.404, 39.915); // 创建点坐标  
    map.centerAndZoom(point, 10); // 初始化地图，设置中心点坐标和地图级别 
    //初始化控件
    let geolocationControl = new BMap.GeolocationControl();
    let navigationControl = new BMap.NavigationControl();
    let overviewControl = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(0, 40),
        isOpen: true
    });
    let scaleControl = new BMap.ScaleControl();
    let copyrightControl = new BMap.CopyrightControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    });

    // 返回地图可视化区域
    let bs = map.getBounds();
    // 设置copyright
    copyrightControl.addCopyright({
        id: 123456789,
        content: '<h2>just for fun!</h2>',
        bounds: bs
    });
    let mapTypeControl = new BMap.MapTypeControl();

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
 * 设置坐标并且注册回调函数
 * @param {any} data 坐标相关数据
 * @param {string} event 事件名称
 * @param {function} callback 事件回调
 * @returns {Array} circles数组
 */

MyMap.prototype.setMarkers = function (data, event, callback) {
    if (typeof data !== 'object') {
        throw TypeError('类型错误')
    }
    let length = data.length
    // 设置circles同时把视图移动到第一个circle
    let center = new BMap.Point(data[0].longitude, data[0].latitude)
    // 设置视图详细度
    let level
    if (length === 1) {
        level = 18
    } else if (length < 10) {
        level = 17
    } else if (length < 20) {
        level = 16
    } else if (length < 30) {
        level = 15
    } else {
        level = 14
    }
    this.map.centerAndZoom(center, level)

    let circles = []
    for (let i = 0; i < length; i++) {
        // 根据data创建相应的标注
        let point = new BMap.Point(data[i].longitude, data[i].latitude)
        // let circle = new BMap.circle(point)
        let circle = new BMap.Circle(point, 100, {
            strokeColor: '#1d9ed7', //圆形边线颜色
            fillColor: '#1d9ed7', //圆形填充颜色。
            strokeWeight: 1, //圆形边线的宽度
            fillOpacity: 1 //圆形填充的透明度
            })
        circles.push(circle)
        circles.push(circle)
        // 块级作用域
        let content = '站点名：' + data[i].stationName
        this.map.addOverlay(circle)

        circle.addEventListener('click', (e) => {
            // this.openInfo(content, e)
            $('#stationName').val(data[i].stationName).attr("stationID", data[i].stationID)

            var infoWindow = new BMap.InfoWindow(content, infoWindowOptions);  // 创建信息窗口对象 
            this.map.openInfoWindow(infoWindow,e.point); //开启信息窗口
        })
        // 给circle添加回调
        if (arguments.length === 3) {
            if (typeof event === 'string' && typeof callback === 'function') {
                circle.addEventListener(event, callback)
            } else {
                throw new TypeError('类型错误')
            }
        }
    }
    this.map.circles = circles
    this.map.circles.data = data
    return circles
}

/**
 * 
 * @param {any} content 信息窗口内容 
 * @param {any} e 事件
 */
MyMap.prototype.openInfo = function (content, e) {

    let p = e.target
    let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
    let infoWindow = new BMap.InfoWindow(content, infoWindowOptions)
    // 根据Point和InfoWindow开启
    this.map.openInfoWindow(infoWindow, point)
}