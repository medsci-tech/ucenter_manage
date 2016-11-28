var vm_count_bean_by_year_month_compare = new Vue({
    el: '#count_bean_by_year_month_compare',
    data: {
        title: 'count_bean_by_year_month_compare',
        get_url: 'month_bean/',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 600
        },
 
        data_head: ['popularize', 'consume', 'article_learn', 'register'],
        select: now_year
    },
    computed: {
        data: function() {
            var data = this.get_data;
            var result = {
                popularize: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                consume: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                article_learn: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                register: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            for (item in data) {
                result[data[item].type][data[item].month - 1] = data[item].count
            }
            return result;
        },
        xAxis_data: function() {
            var result = [];
            for (var i = 1; i <= 31; i++) {
                result.push(i);
            }
            return result;
        }
    },
    watch: {
        'select': function() {
            this.refresh();
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                 color: color,
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                tooltip: {
                    trigger: 'axis',
                    // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    // }
                },
                legend: [{
                    data: [this.data_head[3], this.data_head[2]],
                    x: 'left'
                }, {
                    data: [this.data_head[0], this.data_head[1]],
                    x: 'right'
                }],
                // dataZoom: [{
                //     show: true,
                //     realtime: true,
                //     filterMode: 'empty',
                //     xAxisIndex: [0, 1]
                // }, {
                //     type: 'inside',
                //     realtime: true,
                //     xAxisIndex: [0, 1]
                // }],
                grid: [{
                    left: 70,
                    right: 70,
                    height: '35%'
                }, {
                    left: 70,
                    right: 70,
                    top: '55%',
                    height: '35%'
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: this.xAxis_data,
                    name: 'month',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }, {
                    gridIndex: 1,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: this.xAxis_data,
                    position: 'top',
                    name: 'month',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: 'bean',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }, {
                    gridIndex: 1,
                    type: 'value',
                    inverse: true,
                    name: 'bean',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                series: [{
                    type: 'line',
                    name: this.data_head[0],
                    data: this.data[this.data_head[0]],
                    // stack: 'all',
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[1],
                    data: this.data[this.data_head[1]],
                    // stack: 'all',
                    areaStyle: { normal: {} },
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[2],
                    data: this.data[this.data_head[2]],
                    // stack: 'all',
                    areaStyle: { normal: {} },
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[3],
                    data: this.data[this.data_head[3]],
                    // stack: 'all',
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, ]
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);
            // chart.dispatchAction({type: 'legendUnSelect',name: this.data_head[1]});
            // chart.dispatchAction({type: 'legendUnSelect',name: this.data_head[2]});
        },
        refresh: function(e) {
            var vm = this;
            $.get(vm.get_url + vm.select, {}, function(data) {
                vm.get_data = data;
                vm.chart();
            });
        }
    },
    compiled: function() {
        this.refresh();
    }

});
