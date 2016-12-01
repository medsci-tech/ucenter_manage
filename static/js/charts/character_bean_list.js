var vm_character_bean_list = new Vue({
    el: '#character_bean_list',
    data: {
        title: 'character_bean_list',
        data: '',
        box_size: {
            width: 'auto',
            height: 250
        },
        page: 1,
        page_count: 1,
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
            if (i < 1) { i = 1 };
            if (i > vm.page_count) { i = vm.page_count };
            $.get(vm.get_url + i, {}, function(data) {
                if (data) {
                    vm.page = i;
                    vm.page_count = data.count;
                    vm.data = data.rows;
                }
            })
        }
    },
    computed: {
        page_array: function() {
            var start = Math.floor((this.page-1) / 10) * 10 +1,
                end = (start + 10) < this.page_count ? (start + 10) : this.page_count,
                result = [];
            for (var i = start; i <= end; i++) {
                result.push(i);
            }
            return result;
        }
    },
    compiled: function() {
        this.choose_page(1);
    }

});
