/**
 * @param {string} url
 * @return Promise 
 */
function firstLoad(url) {
    return new Promise((res, rej) => {
            // 改成url
            $.get(url).done((data) => {
                res(data)
            })
        })
        .then((data) => {
            // 设置坐标点
            map.setMarkers(data, 'click', (e) => {
                // 给每个Marker设置相应的url
                var url = '/da/getInfo' + e.target;
                $.get('test/data2.json').done((data) => {
                    chart.update(data)
                })
            })
        })
}