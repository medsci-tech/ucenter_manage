var vm_character_count_pie = new Vue({
    el: '#character_count_pie',
    data: {
        title: 'character_count_pie',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'year_character/2016',

        data_head: ['popularize', 'consume', 'article_learn', 'register']

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
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                color: color,
                // title: {
                //     text: '*Count User (all)',
                //     subtext: '',
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: this.data_head
                },
                toolbox: {
                    show: true,
                    // feature: {
                    //     mark: { show: true },
                    //     dataView: { show: true, readOnly: false },
                    //     magicType: {
                    //         show: true,
                    //         type: ['pie', 'funnel']
                    //     },
                    //     restore: { show: true },
                    //     saveAsImage: { show: true }
                    // }
                },
                calculable: true,
                series: [{
                    name: '',
                    type: 'pie',
                    radius: [30, 80],
                    center: ['50%', '40%'],
                    minAngle: '10',
                    data: this.data,
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         formatter: "{b} : {c}  ({d}%)"
                    //     }
                    // }
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
