/**
 * 绘制海量点
 * @param {Array} points 点数组
 */
function addMarkers(points) {
    points = points.map(function (point) {
        return new BMap.Point(point.longiTude, point.latiTude)
    })

    //构建海量点对象
    points = new BMap.PointCollection(points, {
        shape: BMAP_POINT_SHAPE_CIRCLE,
        size: BMAP_POINT_SIZE_BIG,
        color: '#1976d2'
    })
    map.addOverlay(points)
}

/**
 * 根据关联点绘制弧线
 * @param {Array} relation 关联点数组
 * @param {Array} points
 */
function addCurvelines(relation, points) {
    let nums = relation.map((elem) => elem.bikeNum)

    let maxValue = Math.max(...nums)
    relation.forEach((elem) => {
        let fromPos = getPosition(points, elem.leaseStation)
        let toPos = getPosition(points, elem.returnStation)
        //求权重（当前值除以最大值）
        let weight = (elem.bikeNum / maxValue).toFixed(2)
        console.log(weight)
        if(fromPos && toPos){
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
        }
    })
}

/**
 * 计算颜色
 * @param {Number} weight 
 * @returns 颜色插值
 */
let getColor = (function () {
    let left = '#00FF00'
    let right = '#FF0000'
    let func = d3.interpolate(left, right)
    return function (weight) {
        return func(weight)
    }
})()


/**
 * 计算线条粗细
 * @param {Number} weight 
 * @returns 线条粗细 
 */
let getStrokeWeight = (function () {
    let max = 10
    return function (weight) {
        return Math.round(weight * max)
    }
})()

/**
 * 
 * @param {Array} points 站点数组
 * @param {String} id 站点ID
 * @returns 站点元素
 */
function getPosition(points, id) {
    // console.log(points, id)
    for (let i = 0; i < points.length; i++) {
        if (id == points[i].stationID) {
            return points[i]
        }
    }
}

function addArrow()