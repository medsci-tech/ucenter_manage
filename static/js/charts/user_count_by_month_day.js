var vm_count_user_by_month_day = new Vue({
    el: '#count_user_by_month_day',
    data: {
        title: 'count_user_by_month_day',
        get_url: 'day_users/2016/8',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['user'],
    },
    computed: {
        data: function() {
            var data = JSON.parse(
                this.get_data
                .replace(/count/g, 'value')
                .replace(/role/g, 'name')
            );
            var result = {
                user: [],
            };
            for (item in data) {
                result[data[item].name][data[item].day - 1] = data[item].value
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
                            type: [ 'line','bar']
                        },
                    }
                },
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
                    name: 'doctor'
                }],
                series: [{
                    type: 'bar',
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

        // vm.get_data = '[{"role": "doctor", "count": 2, "day": 5}, {"role": "doctor", "count": 12, "day": 8}, {"role": "doctor", "count": 32, "day": 7}, {"role": "doctor", "count": 1, "day": 6}, {"role": "doctor", "count": 6, "day": 4}, {"role": "doctor", "count": 49, "day": 3}]';
        // vm.chart();


        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            vm.chart();
        });
    }

});
