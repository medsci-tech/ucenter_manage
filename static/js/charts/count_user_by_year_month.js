var vm_count_user_by_year_month = new Vue({
    el: '#count_user_by_year_month',
    data: {
        title: 'count_user_by_year_month',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'month_users/2016',
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    },
    computed: {
        data: function() {
            var data = JSON.parse(
                this.get_data
                .replace(/count/g, 'value')
                .replace(/role/g, 'name')
            );
            var result = {
                doctor: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                user: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                volunteer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
            for (item in data) {
                result[data[item].name][data[item].month - 1] = data[item].value
            }
            return result;
        },
        data_head: ['doctor', 'user', 'volunteer'],
        xAxis_data: function() {
            var result = [];
            for (var i = 1; i <= 12; i++) {
                result.push(i);
            }
            return result;
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                toolbox: {
                    top: '0%',
                    right: '5%',
                    feature: {
                        magicType: {
                            type: ['line', 'bar']
                        },
                    }
                },
                legend: {
                    data: ['doctor', 'user', 'volunteer'],
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    // boundaryGap: false,
                    data: this.xAxis_data,
                    name: 'month'
                }],
                yAxis: [{
                    type: 'value',
                    name: 'people'
                }],
                series: [{
                    type: 'bar',
                    name: 'doctor',
                    data: this.data.doctor,
                }, {
                    type: 'bar',
                    name: 'user',
                    data: this.data.user,
                }, {
                    type: 'bar',
                    name: 'volunteer',
                    data: this.data.volunteer,
                }]
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);

            chart.on('click', function(params) {
                console.log(params);
            })

            chart.getZr().on('click', function(e) {
                console.log(e);
                console.log(123123);
            })
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
