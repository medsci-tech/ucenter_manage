var vm_character_count_radar = new Vue({
    el: '#character_count_radar',
    data: {
        title: 'character_count_radar',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 300
        },
        get_url: 'year_character/' + phone + '/2016',
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
        indicator: function() {
            var max = Math.max.apply(null, this.data_value);
            var result = [];
            for (item in this.data_head) {
                result.push({
                    name: this.data[item],
                    max: max,
                });
            }
            return result;
        },
        data_value: function() {
            var result = [0, 0, 0, 0];
            for (item in this.data) {
                result[this.data_head.indexOf(this.data[item].name)] = this.data[item].value;
            }
            return result;
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var option = {
                // title: {
                //     text: this.title
                // },
                tooltip: {},
                legend: {
                    data: ['character']
                },
                radar: {
                    // shape: 'circle',
                    indicator: this.indicator
                },
                series: [{
                    name: '',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [{
                        value: this.data_value,
                        name: this.title
                    }]
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
