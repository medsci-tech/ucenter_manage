var vm_count_doctor_by_month_titles = new Vue({
    el: '#count_doctor_by_month_titles',
    data: {
        title: 'count_doctor_by_month_titles',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 400
        },
        get_url: 'month_titles/2016',

        data_head: ['主治医师', '主任医师', '住院医师', '副主任医师']
    },
    computed: {
        data: function() {
            var data = this.get_data;

            var l = this.data_head.length;
            var result = {};
            for (i = 0; i < l; i++) {
                result[this.data_head[i]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            for (item in data) {
                if (data[item].title != null) {
                    result[data[item].title][data[item].month-1] = data[item].count
                }
            }
            return result;
        },

        xAxis_data: function() {
            var result = [];
            for (var i = 1; i <= 31; i++) {
                result.push(i);
            }
            return result;
        },
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height);

            var series = [];
            var l = this.data_head.length;
            var data = this.data;
            for (i = 0; i < l; i++) {
                series.push({
                    type: 'bar',
                    name: this.data_head[i],
                    // stack: 'all',
                    data: this.data[this.data_head[i]],
                    areaStyle: { normal: {} },
                    smooth: true,
                    symbol: 'none',
                })
            }



            var option = {
                color: color,
                // title: {
                //     text: this.title,
                //     subtext: '',
                // },
                tooltip: {
                    trigger: 'axis',
                    // axisPointer: { // ×ø±êÖáÖ¸Ê¾Æ÷£¬×ø±êÖá´¥·¢ÓÐÐ§
                    //     type: 'shadow' // Ä¬ÈÏÎªÖ±Ïß£¬¿ÉÑ¡Îª£º'line' | 'shadow'
                    // }
                },
                toolbox: {
                    top: '0%',
                    right: '5%',
                    feature: {
                        magicType: {
                            type: ['bar', 'line', 'stack', 'tiled']
                        },
                    }
                },
                legend: {
                    data: this.data_head,
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    name: 'month',
                    // boundaryGap: false,
                    splitLine: {
                        show: true,
                    },
                    data: this.xAxis_data,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: 'people',
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
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
