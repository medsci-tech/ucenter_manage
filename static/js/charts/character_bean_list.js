var vm_character_bean_list = new Vue({
    el: '#character_bean_list',
    data: {
        title: 'character_bean_list',
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
});

$('#bean_list_btn').on('click',function(){
    vm_character_bean_list.refresh();
    $('#character_bean_list').modal('show');
});

