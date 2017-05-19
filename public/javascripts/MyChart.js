/**
 * 默认图表样式
 */
var chartOptions = {
    title: {
        text: '自行车租还量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['租车量', '还车量']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {
                readOnly: false
            },
            magicType: {
                type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
        }
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '3%',
        containLabel: true,
        // show: true
    },
    xAxis: [{
        // position: 'top',
        name: '日期',
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            interval: 0,
            rotate: -30
        },
        data: []
    }],
    yAxis: [{
        name: '租还量',
        type: 'value'
    }],
    series: [{
            name: '租车量',
            type: 'line',
            //stack: '总量',
            areaStyle: {
                normal: {}
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                }
            },
            data: []
        },
        {
            name: '还车量',
            type: 'line',
            // stack: '总量',
            areaStyle: {
                normal: {}
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                }
            },
            data: []
        }
    ]
};

/**
 * @class MyChart
 * @param {any} id 
 * @param {any} opts 
 */
function MyChart(id, opts) {
    this.id = id
    this.opts = opts
}
/**
 * set some configs
 */
MyChart.prototype.init = function () {
    this.chart = echarts.init(document.getElementById(this.id));
    // 指定图表的配置项和数据
    this.chart.setOption(this.opts);
}

/**
 * get the data and update chart
 */
MyChart.prototype.update = function (data) {
    // 增加一些断言
    if (data.rental.length !== data.return.length) {
        throw Error('数据长度不一致')
    }
    // 绑定当前作用域
    var that = this;
    // 填入数据        
    var dates = [];
    var rentalnum = [];
    var returnnum = [];

    //显示某天的各个时间段的情况
    if (data.rental.length === 1) {
        for (var i = 0; i < data.rental.length; i++) {
            dates.push(data.rental[i].time)
            rentalnum.push(data.rental[i].rentalnum)
            returnnum.push(data.return[i].returnnum)
        }
    } else {
        for (var i = 0; i < data.rental.length; i++) {
            dates.push(data.rental[i].date)
            rentalnum.push(data.rental[i].rentalnum)
            returnnum.push(data.return[i].returnnum)
        }
    }
    
    //填充数据
    that.chart.setOption({
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                rotate: 0
            },
            data: dates //时间
        }],
        series: [{
                name: '租车量',
                data: rentalnum //租车量
            },
            {
                name: '还车量',
                data: returnnum //还车量
            }
        ]
    })
};