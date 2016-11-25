var vm_count_doctor_by_year_offices = new Vue({
    el: '#count_doctor_by_year_offices',
    data: {
        title: 'count_doctor_by_year_offices',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'year_offices/2016',
    },
    computed: {
        data: function() {
            var data = this.get_data.map(function(item) {
                return {
                    value: item.count,  
                    name: item.office
                }
            })

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

                if (this.data[item].name == '内分泌科') {
                    this.data[item].itemStyle = {
                        normal: {
                            color: color[0],
                        }
                    }
                } else {
                    this.data[item].itemStyle = {
                        normal: {
                            color: color[1],
                        }
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
                color: color,
                // title: {
                //     text: 'Count Bean (2016)',
                //     subtext: '',
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                // legend: {
                //     data: this.data_head,
                // },
                grid: {
                    left: '3%',
                    right: '12%',
                    top: '3%',
                    containLabel: true
                },
                yAxis: [{
                    name: 'office',
                    type: 'category',
                    containLabel: true,
                    data: this.data_head,
                    inverse: true,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                xAxis: [{
                    name: 'people(log)',
                    type: 'log',
                    // logBase: 2,
                    position: 'top',
                    minInterval: 1,
                    // show: false,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: "{c}"
                    },
                    emphasis: {
                        show: true,
                        position: 'right',
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: [1, 1, 0, 0]
                    },
                },
                // barWidth: '40%',
                series: [{
                    type: 'bar',
                    name: '',
                    data: this.data,
                }]
            };
            var chart = echarts.init(document.getElementById(this.title + '_chart'));
            chart.setOption(option);
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
