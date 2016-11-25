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
        data_head: ['未指定', '神经科', '其他科室', '内分泌科', '全科', '甲状腺外科', '老年科', '妇产科', '肾内科', '肿瘤科', '核医学科', '综合内科', '心血管科']

    },
    computed: {
        data: function() {
            var data = this.get_data;


            var filter_data = [];

            for (item in data) {
                if (data[item].office == 'null') {
                    data[item].office = '未指定';
                }
                if (data[item].office != '内分泌科') {

                    filter_data.push(data[item]);
                }

            }

            filter_data = filter_data.map(function(item) {
                return [item.month, item.office, item.count];
            });

            return filter_data;
        },

        data2: function() {
            var data = this.get_data;


            var filter_data = [];

            for (item in data) {
                if (data[item].office == '内分泌科') {
                    filter_data.push(data[item]);
                }
            }

            filter_data = filter_data.map(function(item) {
                return [item.month, item.office, item.count];
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
                name: '内分泌科',
                type: 'effectScatter',
                symbolSize: function(val) {
                    return Math.log(val[2] * 1000);
                },
                data: this.data2,
                animationDelay: function(idx) {
                    return idx * 5;
                }
            }, {
                name: '非内分泌科',
                type: 'scatter',
                symbolSize: function(val) {
                    return Math.log(val[2] * 1000);
                },
                data: this.data,
                animationDelay: function(idx) {
                    return idx * 5;
                }
            }, ];




            var option = {
                color: color,
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
