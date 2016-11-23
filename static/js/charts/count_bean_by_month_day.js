var vm_count_bean_by_month_day = new Vue({
    el: '#count_bean_by_month_day',
    data: {
        title: 'count_bean_by_month_day',
        get_url: 'day_bean/2016/8',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['popularize', 'consume', 'article_learn', 'register'],
    },
    computed: {
        data: function() {
            var data = this.get_data;
            var result = {
                popularize: [],
                consume: [],
                article_learn: [],
                register: []
            };
            for (item in data) {
                result[data[item].type][data[item].day - 1] = data[item].count
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
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
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
                    name: 'day',
                    // boundaryGap: false,
                    data: this.xAxis_data,
                }],
                yAxis: [{
                    type: 'value',
                    name: 'bean'
                }],
                series: [{
                    type: 'bar',
                    name: this.data_head[0],
                    data: this.data[this.data_head[0]],
                    stack: 'all',
                    areaStyle: { normal: {} },
                    // smooth: true,
                    // symbol: 'none',
                }, {
                    type: 'bar',
                    name: this.data_head[1],
                    data: this.data[this.data_head[1]],
                    stack: 'all',
                    areaStyle: { normal: {} },
                    // smooth: true,
                    // symbol: 'none',
                }, {
                    type: 'bar',
                    name: this.data_head[2],
                    data: this.data[this.data_head[2]],
                    stack: 'all',
                    areaStyle: { normal: {} },
                    // smooth: true,
                    // symbol: 'none',
                }, {
                    type: 'bar',
                    name: this.data_head[3],
                    data: this.data[this.data_head[3]],
                    stack: 'all',
                    areaStyle: { normal: {} },
                    // smooth: true,
                    // symbol: 'none',
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
