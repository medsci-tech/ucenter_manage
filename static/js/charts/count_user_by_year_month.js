var vm_count_user_by_year_month = new Vue({
    el: '#count_user_by_year_month',
    data: {
        title: 'count_user_by_year_month',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'month_user/',
 
        data_head: ['doctor', 'user', 'volunteer'],
        select: now_year,

    },
    computed: {
        data: function() {
            var result = {};

            for (i in this.data_head) {
                result[this.data_head[i]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }

            for (i in this.get_data) {
                result[this.get_data[i].role][this.get_data[i].month - 1] = this.get_data[i].count;
            }

            return result;
        },
        xAxis_data: function() {
            var result = [];
            for (var i = 1; i <= 12; i++) {
                result.push(i);
            }
            return result;
        },
    },
    watch: {
        'select': function() {
            this.refresh();
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var vm = this;
            var series = vm.data_head.map(function(item, index) {
                return {
                    type: 'bar',
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
                series: series,
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);

        },
        refresh: function(e) {
            var vm = this;

            $.get(vm.get_url + this.select, {}, function(data) {
                vm.get_data = data;
                vm.chart();
            });

        }
    },
    compiled: function() {
        this.refresh(this.select);
    }
});
