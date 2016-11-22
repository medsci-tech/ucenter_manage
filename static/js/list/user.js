$(".pinned").pin();
var user_list = new Vue({
    el: "#user_list",
    data: {
        get_url: '',
        page: 0,
        page_count: 100,
        data: [],
    },
    methods: {
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
    computed: {
        page_array: function() {
            var start = Math.floor(this.page / 10) * 10,
                end = (start + 10) < this.page_count ? (start + 10) : this.page_count,
                result = [];
            for (var i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }
    },
    compiled: function() {
        this.choose_page(0);
    }
});
