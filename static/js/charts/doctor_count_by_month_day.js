var vm_count_doctor_by_month_day = new Vue({
    el: '#count_doctor_by_month_day',
    data: {
        title: 'count_doctor_by_month_day',
        get_url: 'day_user/2016/',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
 
        data_head: ['doctor'],
        select_year: now_year,
        select_month: now_month,
    },
    computed: {
        data: function() {
            var data = this.get_data;
            var result = {
                doctor: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            };
            for (item in data) {
                result[data[item].role][data[item].day - 1] = data[item].count
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
        'select_month': function() {
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
                toolbox: {
                    top: '0%',
                    right: '5%',
                    feature: {
                        magicType: {
                            type: ['line', 'bar']
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
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: 'doctor',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
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
            $.get(vm.get_url + vm.select_month, {}, function(data) {
                vm.get_data = data;
                vm.chart();
            });

        }
    },
    compiled: function() {
        this.refresh();
    }

});
