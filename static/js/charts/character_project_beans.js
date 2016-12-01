var vm_character_project_beans = new Vue({
    el: '#character_project_beans',
    data: {
        title: 'character_project_beans',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 200
        },
        get_url: 'projects',

    },
    computed: {
        data: function() {
            return this.get_data.map(function(item) {
                return [item.project_name, 'bean', item.count];
            });

        },

        data_head: function() {
            return this.get_data.map(function(item) {
                return item.project_name
            });
        }

    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var vm = this;

            var series = this.data.map(function(item, index) {
                return {
                    name: item[0],
                    type: 'scatter',
                    symbol: 'pin',
                    // symbolOffset: [0, '50%'],
                    symbolSize: function(item) {
                        // return item[2];
                        return Math.log(item[2]) * 7;
                    },
                    data: [item],
                    label: {
                        normal: {
                            show: true,
                            formatter: item[2],
                        }
                    },
                    markLine: {
                        // symbol: ['none', 'arrow'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: [
                            [
                                { coord: [vm.data_head[index]] },
                                { coord: [vm.data_head[index + 1]] }
                            ]
                        ]

                    }
                }
            });


            var option = {
                color: color,
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                tooltip: {
                    formatter: function(params) {
                        return params.value[0] + " " + params.value[1] + ':' + params.value[2];
                    }
                },
                legend: {
                    data: this.data_head,
                    botton: '0%',
                },
                grid: {
                    top: '60%'
                },
                xAxis: [{
                    type: 'category',
                    // name: 'project',
                    boundaryGap: true,
                    // splitLine: {
                    //     show: true,
                    // },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    data: this.data_head,
                }],
                yAxis: [{
                    type: 'category',
                    // name: 'beans',
                    // boundaryGap: false,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },


                    axisLabel: {
                        // show: false,
                        textStyle: {
                            fontWeight: 'bold',
                        }
                    },

                    data: ['bean'],
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
