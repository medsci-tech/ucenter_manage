var vm_count_doctor_by_year_offices_pie = new Vue({
    el: '#count_doctor_by_year_offices_pie',
    data: {
        title: 'count_doctor_by_year_offices_pie',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 450
        },
        get_url: 'year_office/2016',
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#6e7074', '#546570', '#c4ccd3']
    },
    computed: {
        data: function() {
            var data = JSON.parse(
                this.get_data
                .replace(/count/g, 'value')
                .replace(/office/g, 'name')
            );

            data.sort(function(a, b) {
                return b.value - a.value;
            })
            return data;
        },
        data_head: function() {
            var result = [];
            for (item in this.data) {
                if (this.data[item].name == null) {
                    this.data[item].name = '未指定'
                }
                result.push(this.data[item].name);
                this.data[item].itemStyle = {
                    normal: {
                        color: this.color[item],
                    }
                }

            }
            return result;
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                // title: {
                //     text: 'Count Bean (2016)',
                //     subtext: '',
                // },
                legend: {
                    data: this.data_head,
                    x: 'center',
                    y: 'bottom',    
                },
                color: this.color,
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                // grid: {
                //     left: '3%',
                //     right: '12%',
                //     top: '3%',
                //     containLabel: true
                // },
                // yAxis: [{
                //     name: 'office',
                //     type: 'category',
                //     containLabel: true,
                //     data: this.data_head,
                //     inverse: true
                // }],
                // xAxis: [{
                //     name: 'people',
                //     type: 'log',
                //     // logBase: 2,
                //     position: 'top',
                //     minInterval: 1,
                //     // show: false,
                // }],
                // label: {
                //     normal: {
                //         show: true,
                //         position: 'right',
                //         formatter: "{c}"
                //     },
                //     emphasis: {
                //         show: true,
                //         position: 'right',
                //     }
                // },
                // itemStyle: {
                //     normal: {
                //         barBorderRadius: [1, 1, 0, 0]
                //     },
                // },
                // barWidth: '40%',
                series: [{
                    type: 'pie',
                    name: '',
                    data: this.data,
                    radius: [0, '80%'],
                    center: ['50%', '50%'],
                    minAngle: '5',
                    selectedMode: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 2,
                        }
                    }
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

        $.get(this.get_url, {}, function(data) {

            vm.get_data = data;
            vm.chart();
        });
    }


});
