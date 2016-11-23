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
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        select: '2016',
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
            var result = [];
            for (item in this.data) {
                result.push(this.data[item].name);
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
