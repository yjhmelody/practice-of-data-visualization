window.addEventListener("load", initChart);

function initChart(e) {
    var chart = echarts.init(document.getElementById("chart"));

    // 指定图表的配置项和数据
    var option = {
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
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                rotate: -30
            },
            data: []
        }],
        yAxis: [{
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

    chart.setOption(option);

    $.get('test/data2.json').done(function (data) {
        // 填入数据        
        var dates = [];
        var rentalnum = [];
        var returnnum = [];
        for (var i = 0; i < data.rental.length; i++) {
            dates.push(data.rental[i].date);
            rentalnum.push(data.rental[i].rentalnum);
            returnnum.push(data.return[i].returnnum);
            // console.log(data.rental[i].rentalnum, data.return[i].returnnum);
        }

        chart.setOption({
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    rotate: -10
                },
                data: dates
            }],
            series: [{
                    name: '租车量',
                    data: rentalnum
                },
                {
                    name: '还车量',
                    data: returnnum
                }
            ]
        })
    })
}