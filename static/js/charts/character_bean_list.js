var vm_character_bean_list = new Vue({
    el: '#character_bean_list',
    data: {
        title: 'character_bean_list',
        data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        page: 0,
        page_count: 100,
        get_url: 'bean_list/',
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

            $.get(this.get_url + vm.page, {}, function(data) {
                vm.data = data;
            });
        },
        choose_page: function(i) {
            var vm = this;
            if (i < 0) { i = 0 };
            if (i > vm.page_count) { i = vm.page_count - 1 };
            $.get(vm.get_url + i, {}, function(data) {
                if (data) {
                    var data = JSON.parse(data);
                    vm.page = i;
                    vm.page_count = data.page_count
                    vm.data = JSON.parse(data.page_data);
                }
            })
        }
    },
    compiled: function() {

        var vm = this;

        $.get(vm.get_url + vm.page, {}, function(data) {
            vm.data = data;
        });

    }

}); 
