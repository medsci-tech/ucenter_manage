var vm_character_count_month_beans = new Vue({
    el: '#character_count_month_beans',
    data: {
        title: 'character_count_month_beans',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        get_url: 'month_character/' + phone + '/2016',
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['character'],
    },
    computed: {
        data: function() {
            var data = this.get_data.map(function(item) {
                return {
                    value: item.count,
                    name: item.name
                }
            })
            var result = {
                character: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
            for (item in data) {
                result[data[item].name][data[item].month - 1] = data[item].value
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
                toolbox: {
                    top: '0%',
                    right: '5%',
                    feature: {
                        magicType: {
                            type: ['bar', 'line']
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    // }
                },
                // legend: {
                //     data: [this.data_head[0]+'_line',this.data_head[0]+'_bar',],
                // },
                grid: {
                    top: '10%',
                    left: '6%',
                    right: '8%',
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
                    data: this.data[this.data_head[0]],
                    areaStyle: { normal: {} },      
                    smooth: true,
                    symbol: 'none',
                }]
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

        // vm.get_data = '[{"role": "doctor", "count": 2, "month": 5}, {"role": "doctor", "count": 12, "month": 8}, {"role": "doctor", "count": 32, "month": 7}, {"role": "doctor", "count": 1, "month": 6}, {"role": "doctor", "count": 6, "month": 4}, {"role": "doctor", "count": 49, "month": 3}]';
        // vm.chart();

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            vm.chart();
        });
    }

});
