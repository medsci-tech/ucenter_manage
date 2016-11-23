var vm_count_doctor = new Vue({
    el: '#count_doctor',
    data: {
        title: 'count_doctor',
        get_data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        get_url: 'year_doctor/2016',
        color: ['#00a0e9', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    },
    computed: {
        data: function() {
            return JSON.parse(
                this.get_data
                .replace(/count/g, 'value')
                .replace(/role/g, 'name')
            );
        },
        data_head: function() {
            var result = [];
            for (item in this.data) {
                result.push(this.data[item].name);
            }
            return result;
        }
    },
    methods: {
        chart: function() {
            $('#' + this.title + '_chart').height(this.box_size.height)
                .html("<div>" + this.data[0].value + "</div>")
                .children('div').css({
                    'font-size': '90px',
                    'margin': 'auto',
                    'padding-top': '30px',
                    'text-align': 'center',
                    'font-weight': 'bold',
                    'color': '#fff'
                })
                .parents('.panel').css({
                    'background-color': '#00a0e9'
                })
                .children('.panel-heading').css({
                    'color': '#fff'
                });

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


        // vm.get_data = '[{"role": "doctor", "count": 102}]';
        // vm.chart();

        $.get(this.get_url, {}, function(data) {
            vm.get_data = data;
            vm.chart();
        });
    }

});
