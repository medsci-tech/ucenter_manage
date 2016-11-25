var vm_count_doctor_by_year_titles_pie = new Vue({
    el: '#count_doctor_by_year_titles_pie',
    data: {
        title: 'count_doctor_by_year_titles_pie',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'year_titles/2016',
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#6e7074', '#546570', '#c4ccd3']
    },
    computed: {
        data: function() {
            var data = this.get_data.map(function(item) {
                return {
                    value: item.count,
                    name: item.title
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
                result.push(this.data[item].name);
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
                 color: color,
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: this.data_head
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: [0, 80],
                    center: ['50%', '40%'],
                    minAngle: '10',
                    data: this.data,
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
