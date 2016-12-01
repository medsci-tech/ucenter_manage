var vm_character_info = new Vue({
    el: '#character_info',
    data: {
        title: 'character_info',
        data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        get_url: 'info/',
    },
    methods: {
        is_show: function(e) {
            if (typeof(e) == 'object' || e == 'None') {
                return false;
            }
            return true;
        },
        refresh: function(e) {
            var vm = this;

            $.get(this.get_url, {}, function(data) {
                vm.data = data;
            });
        }
    },
    compiled: function() {

        var vm = this;

        $.get(this.get_url, {}, function(data) {
            vm.data = data;
        });

    }

});
