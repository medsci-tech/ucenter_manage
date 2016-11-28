var vm_count_bean_by_year = new Vue({
    el: '#count_bean_by_year',
    data: {
        title: 'count_bean_by_year',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'year_bean/',
 
        select: now_year,
    },
    computed: {
        data: function() {
            return this.get_data.map(function(item) {
                return {
                    value: item.count,
                    name: item.type
                }
            })
        },
        data_head: function() {
            var result = [];
            for (item in this.data) {
                result.push(this.data[item].name);
                this.data[item].itemStyle = {
                    normal: {
                         color: color[item],
                    }
                }
            }
            return result;
        },
    },
    watch: {
        'select': function() {
            this.refresh();
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
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
                    right: '8%',
                    top: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value',
                    position: 'top',
                    name: 'bean',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    name: 'category',
                    type: 'category',
                    data: this.data_head,
                    inverse: true,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                // label: {
                //     normal: {
                //         show: true,
                //         formatter: "{c}"
                //     },
                //     emphasis: {
                //         show: true,
                //     }
                // },
                itemStyle: {
                    normal: {
                        barBorderRadius: [0, 1, 1, 0]
                    },
                },
                barWidth: '40%',
                series: [{
                    type: 'bar',
                    name: '',
                    data: this.data,
                }]
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

       this.refresh();
    }


});
