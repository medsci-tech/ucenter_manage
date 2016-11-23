var vm_count_doctor_by_month_offices_scatter = new Vue({
    el: '#count_doctor_by_month_offices_scatter',
    data: {
        title: 'count_doctor_by_month_offices_scatter',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 500
        },
        get_url: 'month_offices/2016',
        color: ['#c23531', '#00a0e9', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['project']

    },
    computed: {
        data: function() {
            var data = this.get_data.map(function(item) {
                return {
                    value: item.count,
                    name: item.office
                }
            })


            var filter_data = [];

            for (item in data) {
               
            }

            filter_data = filter_data.map(function(item) {
                return [item.month, item.name, item.value];
            });

            return filter_data;
        },

        xAxis_data: function() {
            var result = [];
            for (var i = 1; i <= 31; i++) {
                result.push(i);
            }
            return result;
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var series = [{
                name: '非内分泌科',
                type: 'scatter',
                symbolSize: function(val) {
                    return Math.log(val[2]*1000);
                },
                data: this.data,
                animationDelay: function(idx) {
                    return idx * 5;
                }
            }, {
                name: '内分泌科',
                type: 'effectScatter',
                symbolSize: function(val) {
                    return Math.log(val[2]*1000);
                },
                data: this.data2,
                animationDelay: function(idx) {
                    return idx * 5;
                }
            }, ];




            var option = {
                color: this.color,
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                tooltip: {
                    formatter: function(params) {
                        return params.value[0] + 1 + ' 月 ' + params.value[1] + ':' + params.value[2];
                    }
                },
                legend: {
                    data: ['内分泌科', '非内分泌科'],
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
                    boundaryGap: true,
                    splitLine: {
                        show: true,
                    },
                    data: this.xAxis_data,
                }],
                yAxis: [{
                    type: 'category',
                    name: 'office',
                    data: this.data_head,
                }],
                series: series
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
