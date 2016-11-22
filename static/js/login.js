var login = new Vue({
    el: 'body',
    data: {
        phone: '',
        code: ''
    },
    methods: {
        get_code: function(e) {
            $(e.target).attr('disabled', 'disabled');
            $.get('code/' + this.phone);
            var i = 61;
            timer();

            function timer() {
                i--;
                $(e.target).text(i + '秒后重发');
                if (i == 0) {
                    clearTimeout(timer);
                    $(e.target).removeAttr("disabled");
                    $(e.target).text('重新发送');
                } else {
                    setTimeout(timer, 1000);
                }
            }
        },
        login: function() {
            $.get('login/' + this.phone + '' + this.code);
        }
    }
});
