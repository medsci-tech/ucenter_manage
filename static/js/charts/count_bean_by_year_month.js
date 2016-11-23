var vm_count_bean_by_year_month = new Vue({
    el: '#count_bean_by_year_month',
    data: {
        title: 'count_bean_by_year_month',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'month_bean/2016',
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['popularize', 'consume', 'article_learn', 'register'],
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
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                color: this.color,
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
                legend: {
                    data: this.data_head,
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    name: 'month',
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                    },
                    data: this.xAxis_data,
                }],
                yAxis: [{
                    type: 'value',
                    name: 'bean'
                }],
                series: [{
                    type: 'line',
                    name: this.data_head[0],
                    stack: 'all',
                    data: this.data[this.data_head[0]],
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[1],
                    stack: 'all',
                    data: this.data[this.data_head[1]],
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[2],
                    stack: 'all',
                    data: this.data[this.data_head[2]],
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, {
                    type: 'line',
                    name: this.data_head[3],
                    stack: 'all',
                    data: this.data[this.data_head[3]],
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                }, ]
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);
        },
        refresh: function(e) {
            var vm = this;
            if (e == 0) {
                $.get(vm.get_url, {}, function(data) {
                    vm.get_data = data;
                    vm.chart();
                });
            } else {
                $.get(e, {}, function(data) {
                    vm.get_data = data;
                    vm.chart();
                });
            }

        }
    },
    compiled: function() {

        var vm = this;

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            vm.chart();
        });
    }

});
