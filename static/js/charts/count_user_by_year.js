var vm_count_user_by_year = new Vue({
    el: '#count_user_by_year',
    data: {
        title: 'count_user_by_year',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'year_user/',

        select: now_year,
        data_head: ['doctor', 'user', 'volunteer'],
    },
    computed: {
        data: function() {
            var result = [];

            for (i in this.get_data) {
                result[this.data_head.indexOf(this.get_data[i].role)] = {
                    name: this.get_data[i].role,
                    value: this.get_data[i].count,
                }
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

            var option = {
                color: color,
                // title: {
                //     text: '*Count Bean (2016)',
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
                // toolbox: {
                //     show: true,
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
                // },
                calculable: true,
                series: [{
                    // name: '面积模式',
                    type: 'pie',
                    radius: [25, 80],
                    center: ['50%', '40%'],
                    roseType: 'area',
                    data: this.data,
                    minAngle: '10',
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
