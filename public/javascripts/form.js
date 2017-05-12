// $('.form>button').click(function (e) {
//     var url = '/users';
//     var query = {};
//     $('.form>').each(function (index, elem) {
//         query[elem.name] = elem.value;
//     });

//     $.get(url, query, function (data) {
//         console.log(url, query, data);
//     });
//     drawMakers(data_info, opts)
// });

// var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
// 					 [116.406605,39.921585,"地址：北京市东城区东华门大街"],
// 					 [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
// 					];


// var opts = {
//     width: 250,
//     height: 100,
//     title: '站点信息',
//     enableMessage: true
// }

// function drawMakers(data, opts) {
//     for (var i = 0; i < data.length; i++) {
//         // 根据data创建相应的标注
//         var maker = new BMap.Marker(new BMap.Point(data[i][0], data[i][1]))
//         var content = data[i][2]
//         map.addOverlay(maker)
//         marker.addEventListener('click', function (e) {
//             openInfo(content, e)
//         })
//     }
// }

// /**
//  * 
//  * 
//  * @param {any} content 信息窗口内容 
//  * @param {any} e 事件
//  */

// function openInfo(content, e) {
//     var p = e.target
//     var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
//     var infoWindow = new BMap.InfoWindow(content, opts)
//     // 根据Point和InfoWindow开启
//     map.openInfoWindow(infoWindow, point)
// }