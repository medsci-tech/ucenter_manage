var vm_count_user = new Vue({
    el: '#count_user',
    data: {
        title: 'count_user',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'all_user',
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    },
    computed: {
        data: function() {
            return this.get_data.map(function(item) {
                return {
                    value: item.count,
                    name: item.role
                }
            })
        },
        data_head: function() {
            return this.data.map(function(item) {
                return item.name
            })
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
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

            $.get(vm.get_url, {}, function(data) {
                vm.get_data = data;
                vm.chart();
            });

        }
    },
    compiled: function() {

        var vm = this;

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            // vm.get_data = '[{"role": "doctor", "count": 102}, {"role": "user", "count": 125}, {"role": "volunteer", "count": 78}, {"role": "enterprise", "count": 21}]';
            vm.chart();
        });
    }

});
