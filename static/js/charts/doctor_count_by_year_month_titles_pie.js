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
    },
    computed: {
        data: function() {

            var del = [];
        
            var data = this.get_data.map(function(item) {
                if (item.title == null) {
                    del.push({
                        value: item.count,
                        name: item.title
                    })
                };
                return {
                    value: item.count,
                    name: item.title
                }
            })

            for( i in del ){
                data.splice(data.indexOf(del[i]));
            }

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
