var vm_count_user_by_year_month = new Vue({
    el: '#count_user_by_year_month',
    data: {
        title: 'count_user_by_year_month',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        get_url: 'month_user/2016',
 
        data_head: ['user'],
    },
    computed: {
        data: function() {
            var data = this.get_data;
            var result = {
                user: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
            for (item in data) {
                result[data[item].role][data[item].month - 1] = data[item].count
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
                    left: '2%',
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
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: 'user',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                series: [{
                    type: 'line',
                    name: this.data_head[0] + '_line',
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

        // vm.get_data = '[{"role": "user", "count": 2, "month": 5}, {"role": "user", "count": 12, "month": 8}, {"role": "user", "count": 32, "month": 7}, {"role": "user", "count": 1, "month": 6}, {"role": "user", "count": 6, "month": 4}, {"role": "user", "count": 49, "month": 3}]';
        // vm.chart();

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            vm.chart();
        });
    }

});
