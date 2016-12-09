var vm_character_relationship_list = new Vue({
    el: '#character_relationship_list',
    data: {
        title: 'character_relationship_list',
        data: '',
        get_url: 'upstream_downstream_beans',
    },
    methods: {
        is_show: function(e) {
            var hide = ['id', 'longitude', 'latitude', 'title', 'office', 'city'];
            if (hide.indexOf(e) < 0) {
                return true;
            }
            return false;
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
