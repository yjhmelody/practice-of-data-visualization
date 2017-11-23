/**
 * 
 * @param {Array} points 点数组
 */
function addMarker(points) {
    points = points.map(function (point) {
        return new BMap.Point(point.longiTude, point.latiTude)
    })

    points = new BMap.PointCollection(points, {
        shape: BMAP_POINT_SHAPE_CIRCLE,
        size: BMAP_POINT_SIZE_BIG,
        color: '#1976d2'
    })
    //构建海量点对象
    points = new BMap.PointCollection(BMapPoints, options)
    map.addOverlay(points)
}

/**
 * 
 * @param {Array} relation 关联点数组
 */
function addCurvelines(relation) {
    let nums = relation.map((elem) => elem.num)

    let maxValue = Math.max(...nums)

    relation.forEach((elem) => {
        let fromPos = getPosition(elem.from)
        let toPos = getPosition(elem.to)
        //求权重（当前值除以最大值）
        let weight = (elem.num / maxValue).toFixed(2)
        fromPos = new BMap.Point(fromPos.longiTude, fromPos.latiTude)
        toPos = new BMap.Point(toPos.longiTude, toPos.latiTude)

        //根据权重取颜色
        //根据权重取弧线粗细大小
        let curveline = new BMapLib.CurveLine([fromPos, toPos], {
            strokeOpacity: 0.8,
            strokeColor: getColor(weight),
            strokeWeight: getStrokeWeight(weight)
        })
        map.addOverlay(curveline)
    })
}

/**
 * 
 * @param {Number} weight 
 * @returns 颜色插值
 */
let getColor = (function (weight) {
    let left = '#ffeb3b'
    let right = '#f44336'
    return (function () {
        return d3.interpolate(left, right)(weight)
    })
})()

/**
 * 
 * @param {Number} weight 
 * @returns 线条粗细 
 */
let getStrokeWeight = (function (weight) {
    let max = 10
    return function () {
        return Math.round(weight * max)
    }
})()

function getPosition(id) {
    for (let i = 0; i < points.length; i++) {
        if (id === points[i].id) {
            return points[i]
        }
    }
}