var vm_count_doctor_by_month_offices = new Vue({
    el: '#count_doctor_by_month_offices',
    data: {
        title: 'count_doctor_by_month_offices',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 500
        },
        get_url: 'month_offices/2016',
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#6e7074', '#546570', '#c4ccd3'],
        data_head: ['内分泌科', '未指定', '神经科', '其他科室', '全科', '甲状腺外科', '老年科', '妇产科', '肾内科', '肿瘤科', '核医学科', '综合内科', '心血管科']

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
                if (data[item].name == 'null') {
                    data[item].name = '未指定';
                }

                result[data[item].office][data[item].month - 1] = data[item].count
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
                if (this.data_head[i] == '内分泌科') {
                    series.push({
                        type: 'bar',
                        name: this.data_head[i],
                        stack: '内分泌科',
                        data: this.data[this.data_head[i]],
                        areaStyle: { normal: {} },
                        smooth: true,
                        symbol: 'none',
                    })
                } else {
                    series.push({
                        type: 'bar',
                        name: this.data_head[i],
                        stack: '非内分泌科',
                        data: this.data[this.data_head[i]],
                        areaStyle: { normal: {} },
                        smooth: true,
                        symbol: 'none',
                    })
                }

            }





            var option = {
                color: this.color,
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
                            type: ['bar', 'line']
                        },
                    }
                },
                legend: {
                    data: ['内分泌科']
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
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                    },
                    data: this.xAxis_data,
                }],
                yAxis: [{
                    type: 'value',
                    name: 'people'
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
