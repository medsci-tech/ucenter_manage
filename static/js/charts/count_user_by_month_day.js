var vm_count_user_by_month_day = new Vue({
    el: '#count_user_by_month_day',
    data: {
        title: 'count_user_by_month_day',
        get_url: 'day_user/',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        data_head: ['doctor', 'user', 'volunteer', ],

        select_year: now_year,
        select_month: now_month
    },
    computed: {
        data: function() {
            var data = this.get_data;

            var l = this.data_head.length;
            var result = {};
            for (i = 0; i < l; i++) {
                result[this.data_head[i]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
            }
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
        },
        change_select: function() {
            this.refresh(this.select_year + this.select_month);
        },
    },
    watch: {
        'select_year': function() {
            this.refresh();
        },
        'select_month': function() {
            this.refresh();
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var vm = this;

            var series = vm.data_head.map(function(item, index) {
                return {
                    type: 'line',
                    name: item,
                    data: vm.data[item],
                }
            });

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
                    boundaryGap: false,
                    data: this.xAxis_data,
                    name: 'day',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: 'people',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                series: series,
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);
        },
        refresh: function() {
            var vm = this;

            $.get(vm.get_url + this.select_year + '/' + this.select_month, {}, function(data) {
                vm.get_data = data;
                vm.chart();
            })

        }
    },
    compiled: function() {


        this.refresh();
    }
});
