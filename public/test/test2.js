(function () {
    let data = {
        points: [],
        relation: []
    };

    function initialize() {
        createMap();
        addEventListener();
        getOriginData();
    }

    function createMap() {
        const map = new BMap.Map("map", {});
        const point = new BMap.Point(120.200167, 30.25971);
        map.centerAndZoom(point, 15);

        const styleJson = [{
            "featureType": "all",
            "elementType": "all",
            "stylers": {
                "lightness": 10,
                "saturation": -100
            }
        }];
        map.setMapStyle({
            styleJson
        });
        window.map = map;
    }

    function getOriginData() {
        const uri = "./static/data.json";
        $.getJSON(uri, function (res) {
            data = res;
        })
    }

    function addMarker(points) { //points即为站点数据
        const BMapPoints = points.map(function (point) { //将站点转化为地图站点
            return new BMap.Point(point.lng, point.lat);
        });
        const options = { //站点属性配置
            size: BMAP_POINT_SIZE_BIG,
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: '#1976d2'
        };
        const pointCol = new BMap.PointCollection(BMapPoints, options); //构建海量点对象
        map.addOverlay(pointCol); //增加海量点到地图上
    }

    function addEventListener() {
        let time = 0;
        $('.addMarkBtn').click(function () {
            time = (time + 1) % 2;
            switch (time) {
                case (0):
                    $(this).text('绘制站点');
                    map.clearOverlays();
                    break;
                case (1):
                    $(this).text('清除所有');
                    addMarker(data.points);
                    break;
                default:
                    break;
            }
        });
        $('.addLineBtn').click(function () {
            addCurvelines(data.relation)
        });
    }

    function addCurvelines(relation) { //relation即为站点关联数据
        const nums = relation.map(function (rel) {
            return rel.num;
        }); //获取num数组
        const Max = Math.max.apply(Math, nums); //找出最大值
        relation.forEach(function (rel) {
            let from = getXY(rel.from); //根据站点id获取坐标
            let to = getXY(rel.to);
            const num = rel.num;
            const weight = (num / Max).toFixed(2); //求权重（当前值除以最大值）
            from = new BMap.Point(from.lng, from.lat);
            to = new BMap.Point(to.lng, to.lat);
            const opt = { //弧线配置
                strokeOpacity: 0.8,
                strokeColor: getColor(weight), //根据权重取颜色
                strokeWeight: getStrokeWeight(weight) //根据权重取弧线粗细大小
            };
            const curveline = new BMapLib.CurveLine([from, to], opt); //构建弧线对象
            map.addOverlay(curveline); //增加弧线到地图上
        });

        function getColor(weight) { //求颜色插值
            const compute = d3.interpolate('#ffeb3b', '#f44336'); //获取红色到黄色的插值函数
            return compute(weight);
        }

        function getStrokeWeight(weight) { //求粗细大小
            const Max = 10; //固定最大值为10
            return Math.round(weight * Max);
        }

        function getXY(id) { //根据id获取具体站点数据
            const points = data.points;
            for (let i = 0; i < points.length; i++) {
                if (id === points[i].id) return points[i];
            }
        }
    }
    initialize();
})();