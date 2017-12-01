/**
 * 绘制海量点
 * @param {Array} points 点数组
 */
function addMarkers(points) {
    points = points.map(function (point) {
        return new BMap.Point(point.longitude, point.latitude)
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
        // console.log(weight)
        if(fromPos && toPos){
            fromPos = new BMap.Point(fromPos.longitude, fromPos.latitude)
            toPos = new BMap.Point(toPos.longitude, toPos.latitude)
            //根据权重取颜色
            //根据权重取弧线粗细大小
            let curveline = new BMapLib.CurveLine([fromPos, toPos], {
                strokeOpacity: 0.8,
                strokeColor: getColor(weight),
                strokeWeight: getStrokeWeight(weight)
            })
            addArrow(curveline, {
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
    let left = '#ffeb3b'
    let right = '#f44336'
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

function addArrow(lines, style) {
    let r = 14
    let angle = Math.PI / 7
    let points = lines.getPath()
    let middle = points.length / 2
    // console.log(points)
    let pixelStart = map.pointToPixel(points[Math.floor(middle)]);
    let pixelEnd = map.pointToPixel(points[Math.ceil(middle)]);
    let pixelTemX, pixelTemY;
    let pixelX, pixelY, pixelX1, pixelY1;

    if (pixelEnd.x - pixelStart.x == 0) {
        pixelTemX = pixelEnd.x;
    if (pixelEnd.y > pixelStart.y) {
        pixelTemY = pixelEnd.y - r;
    } else {
        pixelTemY = pixelEnd.y + r;
    }
        pixelX = pixelTemX - r * Math.tan(angle);
        pixelX1 = pixelTemX + r * Math.tan(angle);
        pixelY = pixelY1 = pixelTemY;
    } else {
        let delta = (pixelEnd.y - pixelStart.y) / (pixelEnd.x - pixelStart.x);
        let param = Math.sqrt(delta * delta + 1);
    if ((pixelEnd.x - pixelStart.x) < 0) {
        pixelTemX = pixelEnd.x + r / param;
        pixelTemY = pixelEnd.y + delta * r / param;
    } else {
        pixelTemX = pixelEnd.x - r / param;
        pixelTemY = pixelEnd.y - delta * r / param;
    }
        pixelX = pixelTemX + Math.tan(angle) * r * delta / param;
        pixelY = pixelTemY - Math.tan(angle) * r / param;
        pixelX1 = pixelTemX - Math.tan(angle) * r * delta / param;
        pixelY1 = pixelTemY + Math.tan(angle) * r / param;
    }
    let pointArrow = map.pixelToPoint(new BMap.Pixel(pixelX, pixelY));
    let pointArrow1 = map.pixelToPoint(new BMap.Pixel(pixelX1, pixelY1));
    let Arrow = new BMap.Polyline(
        [pointArrow, points[Math.ceil(middle)], pointArrow1], style
    )
    map.addOverlay(Arrow);
}
