var vm_character_relationship_list = new Vue({
    el: '#character_relationship_list',
    data: {
        title: 'character_relationship_list',
        data: '',
        get_url: 'upstream_downstream_beans',
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
                vm.data = data.downstream;
            });
        }
    },
    compiled: function() {
        this.refresh();
    }

});
