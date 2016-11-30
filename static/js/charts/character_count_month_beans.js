var vm_character_count_month_beans = new Vue({
    el: '#character_count_month_beans',
    data: {
        title: 'character_count_month_beans',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'month_character/2016',
 
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
                 color: color,
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                toolbox: {
                    top: '0%',
                    right: '5%',
                    feature: {
                        magicType: {
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                    }
                },
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
